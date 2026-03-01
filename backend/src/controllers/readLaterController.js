import readLater from "../models/ReadLaterModel.js";
import Post from "../models/PostModel.js";
import { updateUserInterests } from "../utils/updatesUserInterests.js";

export const toggleReadLater = async (req, res) => {
    try{
        const { postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post || post.isDeleted){
            return res.status(404).json({message: "Post not found"});
        }

        const existing = await readLater.findOne({
            user: userId,
            post: postId,
        });

        if(!existing){
            await readLater.create({
                user: userId,
                post: postId,
            });


            await updateUserInterests(
                userId,
                post.tags,
                3
            );

        

            return res.json({message: "Post saved for later"});
        }

        await existing.deleteOne();
        return res.json( {message: "Post is removed from read-later"});

    } catch(error){
        console.error(error);
        return res.status(500).json({message: "Something went wrong"});
    }
}


export const getReadLaterPosts = async (req, res) => {
    try{
     const userId = req.user._id;
     const savedPost = await readLater.find({user: userId})
    .populate({path: "post",
        select: "title author views coverImage isMemberOnly publishedAt",
    populate: {
        path: "author",
        select: "name avatar"
    }})
    .sort({createdAt: -1});

    const posts = savedPost.map((item) => ({
      _id: item.post._id,
      title: item.post.title,
      views: item.post.views,
      author: item.post.author,
      coverImage: item.post.coverImage,
      publishedAt: item.post.publishedAt,
      isSaved: true
    }));

    return res.json(posts); 
      
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "something went wrong"});
    }
    
}


export const isReadLaterPost = async (req, res) => {
    try{
    const {postId} = req.params;
    const userId = req.user._id;

    let isSaved = false;
    const existng = await readLater.findOne({
        user: userId,
        post: postId ,
    })

    if(existng) isSaved = true;

    return res.json({isSaved});
            
    } catch(err){
        return res.statu(500).json({message: "something went wrong"})
    }

}