import ReadPost from "../models/ReadPostModel.js";
import Posts from "../models/PostModel.js"
import { updateUserInterests } from "../utils/updatesUserInterests.js";


export const markPostAsRead = async (req, res) => {
    try{
        const {postId} = req.params;
        const { progress } = req.body;
        const userId = req.user._id;

        const post = await Posts.findById(postId);
        if(!post || post.isDeleted){
            return res.status(404).json({message: "Post not found"})
        }

        const completed = progress >= 90;

    const readPost = await ReadPost.findOneAndUpdate(
      { user: userId, post: postId },
      {
        progress,
        completed,
        lastReadAt: new Date(),
      },
      {
        new: true,
        upsert: true, // create if not exists
      }
    );

    if (progress >= 50) {
       await updateUserInterests(
         userId,
         post.tags,
         1
       );
      }


    return res.json({
      message: "Read progress updated",
      readPost,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


export const getReadingHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const history = await ReadPost.find({ user: userId })
      .populate("post")
      .sort({ lastReadAt: -1 });

    return res.json(history);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
