import { response } from "express";
import CommentModal from "../models/CommentModal.js";
import CommentLikeModal from "../models/CommentLikeModal.js";


export const createComment = async (req, res) => {

    try{
        const user = req.user;


        if(!user){
            return res.status(400).json({message: "Something went wrong"});
        }

        const {currentComment, postId} = req.body;

        // console.log(currentComment);

        if(!currentComment || !postId){
            return res.status(400).json({message: "Something went wrong"})
        }

        const newComment = await CommentModal.create({
          post: postId,
          user: user._id,
          comment: currentComment,
      });

      const populatedComment = await newComment.populate("user", "name avatar")
// console.log(populatedComment);

      return res.status(201).json({populatedComment, message: "Commented SuccessFully"});

    }catch(err){
        return res.status(500).json({message: "something went wrong"})
    }



    
}



export const getComment = async (req, res) => {
    try{
     const {postId} = req.params;
     const userId = req.user._id;

     if(!postId){
        return res.status(400).json({message: "Something went wrong"})
     }

     const comments = await CommentModal.find({
        post:postId,
     }).populate("user", "name avatar").sort({createdAt: -1});


     let likedMap = {};

     if(userId){
        const likes = await CommentLikeModal.find({
            user: userId,
            comment: { $in: comments.map(c => c._id)}
        });

        likes.forEach(like => {
            likedMap[like.comment.toString()] = true;
        });
     }


     const result = comments.map(c => ({
        ...c.toObject(), isLikeByMe: !!likedMap[c._id.toString()]
     }));

     return res.json({comments: result});

       
    } catch(err){
        return res.status(500).json({message: "Something went wrong"});
    }

}




export const deleteComment = async (req, res) => {
    try{
        const {commentId }= req.body;
        const userId = req.user._id;

        if(!commentId || !userId){
            return res.status(400).json({message: "Something went wrong"});
        }

        const comment = await CommentModal.findById(commentId);

        if(!comment) return res.status(404).json({message: "Comment not found"});

        if(comment.user.toString() !== userId.toString()){
            return res.status(403).json({message: "You are not Allowed"})
        }

        await CommentModal.findByIdAndDelete(commentId);

        return res.status(200).json({message: "Something went wrong"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Something went wrong"})
    }
}




export const likeComment = async (req, res) => {

    try{
        const { commentId } = req.params;
        const userId = req.user._id;

        const existing = await CommentLikeModal.findById({
            user: userId,
            comment: commentId,
        });
        
        let likesCount;
        if(existing){
            await CommentLikeModal.deleteOne({_id: existing._id});

             likesCount = await CommentModal.findByIdAndUpdate(commentId, {$inc: {likesCount: -1}});
            return res.json({ liked: false });

        } else{
            await CommentLikeModal.create({
                user: userId,
                comment: commentId,
            });
            await CommentModal.findByIdAndUpdate(commentId, {$inc: {likesCount: 1}});
console.log(likesCount);
            return res.json({liked: true, likesCount: likesCount.likesCount});

        }

    } catch(err){
        res.status(500).json({message: "Server error"});
    }
}