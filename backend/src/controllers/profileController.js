import User from "../models/User.js";
import FollowModel from "../models/FollowModel.js";
import PostModel from "../models/PostModel.js";

export const getUserProfile = async (req, res) => {
    try{
        const { userId } = req.params;
        const viewer = req.user || null;

        const user = await User.findById(userId).select(
            "name avatar bio createdAt"
        );

        if(!user){
            return res.status(404).json({message: " User not found"});
        }

        const posts = await PostModel.find({
            author: userId,
            status: "public",
            isDeleted: false,
        })
        .sort({createdAt: -1})
        .select(
            "title excerpt coverImage views likesCount dislikesCount publishedAt"
        );


        const followersCount  = await FollowModel.countDocuments({
            following: userId,
        })

        let isFollowing = false;
        if(viewer){
            const followData = await FollowModel.findOne({
                follower: viewer._id,
                following: userId,
            })

            if(followData){
                isFollowing = true;
            }
        }




        return res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                avatar: user.avatar,
                bio: user.bio,
                joinedAt: user.createdAt,
            },
            posts,
            followersCount,
            isFollowing,
        })


    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}




export const getCreatorProfile = async (req, res) => {
    const user = req.user;
    const {creatorId} = req.params;
    let following = false;

    try{

        const creator = await User.findById(creatorId).select("name bio avatar createdAt");

        if(!creator) return res.status(401).json({message: "Not Found"});

        const followerCount = await FollowModel.countDocuments({
            following: creatorId,
        });

        const isFollowing = await FollowModel.find({
            following: creatorId,
            follower: user._id,
        });
        if(isFollowing){
            following= true;
        }

        
        const posts = await PostModel.find({
            author: creatorId,
            status: "public",
            isDeleted: false,
        }).select("title coverImage views publishedAt").populate("author", "name avatar").sort({createdAt: -1});

        return res.json({
            creator:{
                _id: creator._id,
                name: creator.name,
                bio: creator.bio,
                follower: followerCount,
                isFollowing: following,
            },
            posts,

        });


    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}