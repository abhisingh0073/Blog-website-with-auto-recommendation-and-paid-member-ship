import CommentModal from "../models/CommentModal";


export const createComment = async (req, res) => {

    try{
        const user = req.user;

        if(!user){
            return res.status(400).json({message: "Something went wrong"});
        }

        const { comment, postId} = req.body;

        if(!comment || !postId){
            return res.status(400).json({message: "Something went wrong"})
        }

        const newComment = await CommentModal.create({
          post: postId,
          user: user._id,
          comment: comment,
      });

      const populatedComment = await newComment.populate("user", "name avatar")


      return res.status(201).json({populatedComment});

    }catch(err){
        return res.status(500).json({message: "something went wrong"})
    }



    
}



export const getComment = async (req, res) => {
    try{
     const {postId} = req.params;

     if(!postId){
        return res.status(400).json({message: "Something went wrong"})
     }

     const comments = await CommentModal.find({
        post:postId,
     }).populate("user", "name avatar").sort({createdAt: -1});



     return res.json(comments);

       
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