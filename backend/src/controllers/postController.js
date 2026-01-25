import Post from "../models/PostModel.js"
import slugify from "slugify";
import PostReactionModel from "../models/PostReactionModel.js";
import ReadLaterModel from "../models/ReadLaterModel.js";
import ReadPostModel from "../models/ReadPostModel.js";


export async function createPost(req, res){

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

        const slug = slugify(postTitle, { lower: true, strict: true });
        

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
            coverImage,
            readingTime,
            publishedAt,

        });

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
        if(typeof isMembersOnly === "boolean") post.isMembersOnly = isMembersOnly;

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
        const user = req.user || null;

        const post = await Post.findById(postId);
        if(!post || post.isDeleted || post.status != "public"){
            return res.status(404).json({ message: "Post not found"});
        }

        post.views += 1;
        await post.save();

        let userReaction = null;
        let isSaved = false;
        let readProgress = 0;

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
        }

        return res.status(200).json({
            posts: {
               _id: post._id,
               title: post.title,
               content: post.content,
               views: post.views,
               likesCount: post.likesCount,
               dislikesCount: post.dislikesCount,
               author: post.author,
               createdAt: post.createdAt, 
            },
            userReaction,
            isSaved,
            readProgress,
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Something went Wrong"})
    }
}

