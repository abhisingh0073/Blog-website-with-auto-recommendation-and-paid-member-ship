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
        return res.json({message: "Post is removed from read-later"});
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "Something went wrong"});
    }
}


export const getReadLaterPosts = async (req, res) => {
    try{
     const userId = req.user._id;
     const savedPost = await readLater.find({user: userId})
    .populate("post")
    .sort({createdAt: -1});

    return res.json(savedPost); 
      
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "something went wrong"});
    }
    
}