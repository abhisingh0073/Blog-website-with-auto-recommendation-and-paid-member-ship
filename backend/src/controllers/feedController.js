import FollowModel from "../models/FollowModel.js";
import PostModel from "../models/PostModel.js";

export const getUserFeed = async (req, res) => {
  try {
    const userId = req.user._id;

    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 1️⃣ find followed users
    const following = await FollowModel.find({
      follower: userId,
    }).select("following");

    const followingIds = following.map(f => f.following);

    if (followingIds.length === 0) {
      return res.json({
        posts: [],
        page,
        hasMore: false,
      });
    }

    // 2️⃣ fetch posts
    const posts = await PostModel.find({
      author: { $in: followingIds },
      status: "public",
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name avatar");

    // 3️⃣ check if more posts exist
    const totalPosts = await PostModel.countDocuments({
      author: { $in: followingIds },
      status: "public",
      isDeleted: false,
    });

    return res.json({
      posts,
      page,
      hasMore: skip + posts.length < totalPosts,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
