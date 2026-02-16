import Post from "../models/PostModel.js"
import slugify from "slugify";
import PostReactionModel from "../models/PostReactionModel.js";
import ReadLaterModel from "../models/ReadLaterModel.js";
import ReadPostModel from "../models/ReadPostModel.js";
import path from "path";
import fs from "fs";
import FollowModel from "../models/FollowModel.js";
import MembershipModel from "../models/MembershipModel.js";
import mongoose from "mongoose";
import PostModel from "../models/PostModel.js";
import NotificationModal from "../models/NotificationModal.js";
import { getIO } from "../config/serverSocket.js";


export async function createPost(req, res){

    try{
       const {postTitle,
              postContent,
              excerpt, 
              tags, 
              category, 
              status, 
              isMembersOnly,
            } = req.body;

        const user = req.user;

        const slug = slugify(postTitle, { lower: true, strict: true });
        const io = getIO();
        

        //calculate reading time
        const wordCount = postContent.split(" ").length;
        const readingTime = Math.ceil(wordCount/200);

        const publishedAt = status === "public" ? new Date() : null;


        
        const post = await Post.create({
            title: postTitle,
            slug,
            content: postContent,
            excerpt,
            author: user._id,
            tags: Array.isArray(tags) ? tags : tags?.split(",").map(tag => tag.trim()),
            category,
            status,
            isMembersOnly,
            coverImage: req.file ? `/uploads/${user._id}/${req.file.filename}` : null, 
            readingTime,
            publishedAt,

        });

        const followers = await FollowModel.find({
            following: req.user._id
        }).select("follower");


        if(followers.length>0){

            const notification = followers.map(f => ({
            user: f.follower,
            sender:req.user._id,
            image:req.file ? `/uploads/${user._id}/${req.file.filename}` : null, 
            type: "post",
            message:`${postTitle} : Uploaded by ${req.user.name}`,
            link:`/p/${post._id}`,
           }));

           const savedNotification = await NotificationModal.insertMany(notification);


           savedNotification.forEach((notif, index) => {
               const followerId = followers[index].follower.toString();

               io.to(followerId).emit("notification", notif);
           })



        }



        return res.status(201).json({
            message: "Post created successfully",
            post,
        });

    } catch(error){

        console.log(error);
        return res.status(500).json({ message: "Something went wrong"})
    
    }

} 



export async function updatePost(req, res){

    try{
       const {postTitle,
              postContent,
              excerpt, 
              tags, 
              category, 
              status, 
              isMembersOnly,
              coverImage 
            } = req.body;

        const user = req.user;
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if( !post || post.isDeleted){
            return res.status(404).json({ message: "Post not found"})
        }

        if(post.author.toString() !== user._id.toString()){
            return res.status(403).json({message: "Not allowed"});
        }

        if(postTitle){
            post.title = postTitle;
            post.slug = slugify(postTitle, { lower: true, strict: true });
        }

        if(postContent){
            post.content = postContent;

            const wordCount = postContent.split(" ").length;
            post.readingTime = Math.ceil(wordCount / 200);
        }

        if(excerpt !== undefined) post.excerpt = excerpt;
        if(category) post.category = category;
        if(coverImage) post.coverImage = coverImage;
        if(isMembersOnly) post.isMembersOnly = isMembersOnly;

        if(tags){
            post.tags = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim());
        }


        if(status && status != post.status){
            post.status = status;
        }

        if(status === "public" && !post.publishedAt){
            post.publishedAt = new Date();
        }

        if(status !== "public"){
            post.publishedAt = null;
        }


        await post.save();
        


        return res.status(200).json({
            message: "Post Updated successfully",
            post,
        });

    } catch(error){

        console.log(error);
        return res.status(500).json({ message: "Something went wrong"})
    
    }

}



export async function deletePost(req, res){
    try{
      const { postId } = req.params;
      const userId = req.user._id;
      
      const post = await Post.findById(postId);
      if(!post || post.isDeleted){
        return res.status(404).json({message: "Post not found"});
      }

      if(post.author.toString() !== userId.toString()){
        return res.status(403).json({message: "Not allowed" });
      }

      const fullpath = path.join(process.cwd(), post.coverImage);
      console.log(fullpath);

    //   fs.unlink(`backend\src\public\uploads\698306ec6132fead2d14398a\1771160019441-747661698.jpg`, (err) => {
    //     console.error(err.message);
    //   })

    //   await Post.findByIdAndDelete(postId);


      post.isDeleted = true;
      await post.save();
      
     return res.status(200).json({
      message: "Post deleted successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }

}

export async function readPost(req, res) {

    try{
        const { postId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(postId)){
            return res.status(400).json({message: "Post not found"});
        }


        const user = req.user || null;
        let membershipJoin = false;

        const post = await Post.findById(postId).populate("author", "name avatar");
        if(!post || post.isDeleted || post.status != "public"){
            return res.status(404).json({ message: "Post not found"});
        }


        // checking membership if post is only for membership
        if(post.isMembersOnly){
            if(!user){
                return res.status(401).json({message: "Login required. This post is for members only"})
            }

            if(user._id.toString() !== post.author._id.toString()){
                const membership = await MembershipModel.findOne({
                    user: user._id,
                    creator: post.author._id,
                })
                if(!membership){
                    return res.status(403).json({ message: "You need to subscribe to access this post" });
                }
                membershipJoin = true;

            }

        }



        post.views += 1;
        await post.save();

        let userReaction = null;
        let isSaved = false;
        let readProgress = 0;
        let following = false;
        

        const totalFollower = await FollowModel.countDocuments({
            following: post.author,
        })



        if(user){
            const reactionData = await PostReactionModel.findOne({
                user: user._id,
                post: postId,
            });

            if(reactionData){
                userReaction = reactionData.reaction;
            }


            const saveData = await ReadLaterModel.findOne({
                user: user._id,
                post: postId,
            });
            if(saveData){
                isSaved = true;
            }


            const readProgressData = await ReadPostModel.findOne({
                user: user._id,
                post: postId,
            });
            if(readProgress){
                readProgress = readProgressData.progress;
            }


            const followData = await FollowModel.findOne({
                follower: user._id,
                following: post.author,
            });
            if(followData){
                following=true;
            }

            
            // const membership = await MembershipModel.findOne({
            //     user: user._id,
            //     creator: post.author._id,
            // });
            // if(membership) {
            //     membershipJoin = true;
            // }
        }

        return res.status(200).json({
            post: {
               _id: post._id,
               title: post.title,
               content: post.content,
               views: post.views,
               likesCount: post.likesCount,
               dislikesCount: post.dislikesCount,
               author: post.author,
               publishedAt: post.publishedAt,
               createdAt: post.createdAt,

            },
            sidebarinfo : {
                 userReaction,
                 isSaved,
                 readProgress,
                 following,
                 totalFollower,
                 membershipJoin,
            },
            user: user ? {
                _id: user._id,
                name: user.name,
                avatar: user.avatar,
            }: null,
           
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Something went Wrong"})
    }
}


export async function fetchPostToUpdate(req, res){

    try{
         const userId = req.user._id;
    const { postId } = req.params;
    

    if(!mongoose.Types.ObjectId.isValid(postId)){
        return res.status(400).json({message: "Invalid post id"});
    }

    const post = await PostModel.findById(postId);

    if(!post || post.isDeleted){
        return res.status(404).json({ message: "Post not found" });
    }

    if(post.author.toString() !== userId.toString() ){
        return res.status(401).json({message: "Something went wrong"});
    }


    return res.status(201).json({post});


    }catch(err){
        return res.status(500).json({message: "Something went wrong"})
    }

   
}

