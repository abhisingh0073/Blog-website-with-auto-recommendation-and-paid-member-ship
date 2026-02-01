import Post from "../models/PostModel.js";
import PostReactionModel from "../models/PostReactionModel.js";
import { updateUserInterests } from "../utils/updatesUserInterests.js";

export const reactToPost = async (req, res) => {
    try{
        const { postId } = req.params;
        const { reaction } = req.body;
        const userId = req.user._id;

        if(!["like", "dislike"].includes(reaction)){
            return res.status(400).json({ message: "Invalid reaction "});
        }

        const post = await Post.findById(postId);
        if(!post || post.isDeleted){
            return res.status(404).json({message: "Post not found" });
        }

        const existing = await PostReactionModel.findOne({
            post: postId,
            user: userId,
        });

        if(!existing){
            await PostReactionModel.create({
                post: postId,
                user: userId,
                reaction,
            });

            if(reaction === "like") post.likesCount++;
            else post.dislikesCount++;

            await post.save();


            // after user likes post
            await updateUserInterests(
                    userId,
                    post.tags,
                    2
                ); 

            return res.json({message: `you ${reaction} the post`});
        }

        if(existing.reaction === reaction){
            await existing.deleteOne();

            if(reaction === "like") post.likesCount--;
            else post.dislikesCount--;

            await post.save();
            return res.json({message: `${reaction} removed`});
        }

        if(existing.reaction !== reaction){
            if(reaction === "like"){
                post.likesCount++;
                post.dislikesCount--;

                // after user likes post
               await updateUserInterests(
                    userId,
                    post.tags,
                    2
                ); 

            } else{
                post.likesCount--;
                post.dislikesCount++;
            }

            existing.reaction = reaction;
            await existing.save();
            await post.save();


            return res.json({ message: `changed to ${reaction}`});
        } 
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "Something went wrong"});
    }
};
