import FollowModel from "../models/FollowModel.js";
import PostModel from "../models/PostModel.js";
import User from "../models/User.js";
import { updateUserInterests } from "../utils/updatesUserInterests.js";
import { getIO } from "../config/serverSocket.js";
import NotificationModal from "../models/NotificationModal.js";

export const toggleFollow = async (req, res) => {
    try{
        const followerId = req.user._id;
        const {userIdToFollow } = req.params;
        const io = getIO();

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

        // console.log(req.user);

        if(!existing){
            await FollowModel.create({
                follower: followerId,
                following: userIdToFollow,
            });


            //sending notification of follower
            const notification = await NotificationModal.create({
                user: userIdToFollow,
                sender: req.user._id,
                image: req.user.avatar,
                type: "follow",
                message: `${req.user.name} followed you`,
                link: `/c/${req.user._id}`,
            });

            // console.log(notification);

            io.to(userIdToFollow.toString()).emit("notification", notification);


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


        return res.json({ message: "Unfollowed successfully"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}