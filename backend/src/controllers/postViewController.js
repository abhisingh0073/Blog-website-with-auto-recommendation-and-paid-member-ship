import Post from "../models/PostModel.js";
import PostView from "../models/PostViewModel.js";
import { randomUUID } from "crypto";

export const trackPostView = async (req, res) => {
    try{
        const { postId } = req.params;
        const user = req.user._id;

        const post = await Post.findById(postId);
        if(!post || post.isDeleted){
            return res.status(404).json({message : "Post is not Found"});
        }

        let sessionId = req.cookies.viewSessionsId;

        if(!user && !sessionId){
            sessionId = randomUUID();
            res.cookies("viewSessionId", sessionId, {
                httpOnly: true,
                maxAge:  24 * 60 * 60 * 1000,
            });
        }

        const viewQuery = {
            post: postId,
            ...Post(user ? {user:user._id} : { sessionId }),
        };

        const isAlreadyViewed = await PostView.findOne(viewQuery);

        if(isAlreadyViewed){
            return res.json({message: "View already counted"});
        }

        await PostView.create(viewQuery);
        post.views += 1;
        await post.save();

        return res.json({message: "view Counted"});
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "something went wrong"});
    }
}
