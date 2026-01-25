import FollowModel from "../models/FollowModel.js";
import User from "../models/User.js";
import { updateUserInterests } from "../utils/updatesUserInterests.js";

export const toggleFollow = async (req, res) => {
    try{
        const followerId = req.user._id;
        const {userIdToFollow } = req.params;

        if(followerId.toString() === userIdToFollow.toString()){
            return res.status(400).json({message: "You cannot follow yourself"});
        }

        const userExists = await User.findById(userIdToFollow);
        if(!userExists){
            return res.status(404).json({ message: "User not found" });
        }

        const existing = await FollowModel.findOne({
            follower: followerId,
            following: userIdToFollow,
        });

        if(!existing){
            await FollowModel.create({
                follower: followerId,
                following: userIdToFollow,
            });


            //sendind interest 
            const recentPosts = await PostModel.find({
                author: userIdToFollow,
                status: "public",
            }).limit(5);

            const tags = recentPosts.flatMap(p => p.tags);

            await updateUserInterests(
                followerId,
                tags,
                2
            );


            return res.json({message: "Followed successfully"})
        }

        await existing.deleteOne();


        return res.json({ message: "Ufollowed successfully"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}