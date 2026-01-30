import PostModel from "../models/PostModel.js";
import FollowModel from "../models/FollowModel.js";

export const getRecommendations = async (req, res) => {
    try{
        const user = req.user || null;
        let results = [];

        const postSelection = "coverImage title author views publishedAt"

        if(user && user.interests?.length){
            const topTags = user.interests
               .sort((a, b) => b.score-a.score)
               .slice(0, 5)
               .map(i => i.tag);

            const interestPosts = await PostModel.find({
                status: "public",
                isDeleted: false,
                tags: { $in: topTags },
            })
            .select(postSelection)
            .populate("author", "name avatar")
            .limit(10);

            const follows = await FollowModel.find({
                follower : user._id,
            }).select("following");

            const followIds = follows.map(f => f.following);

            const followPosts = followIds.length ? await PostModel.find({
                author: { $in: followIds},
                status: "public",
                isDeleted: false,
            }).select(postSelection)
            .populate("author", "name avatar")
            .limit(10):[];
            
            
            results = [...interestPosts, ...followPosts];
          }


          if(results.length < 10){
            const trending = await PostModel.find({
                status: "public",
                isDeleted: false,
            })
            .select(postSelection)
            .populate("author", "name avatar")
            .sort({views: -1, createAt: -1})
            .limit(10);


            results.push(...trending);
          }


          const unique = Array.from(
            new Map(results.map(p => [p._id.toString(), p])).values()
          ).slice(0, 10);

          return res.json(unique);

    } catch(error){
        console.error(error);
            res.status(500).json({message: "Something went wrong"})
    }
}