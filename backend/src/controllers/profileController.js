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
    const user = req.user || null;
    const {creatorId} = req.params;
    let following = false;
    

    try{

        const creator = await User.findById(creatorId).select("name bio avatar coverImage createdAt socials");

        if(!creator) return res.status(404).json({message: "Not Found"});

        const followerCount = await FollowModel.countDocuments({
            following: creatorId,
        });

        const postCount = await PostModel.countDocuments({
            author: creatorId,
            status: "public",
            isDeleted: false,
        })

        if(user){
        const isFollowing = await FollowModel.findOne({
            following: creatorId,
            follower: user._id,
        });
        if(isFollowing){
            following= true;
        }            
        }


        return res.json({
            creator:{
                _id: creator._id,
                name: creator.name,
                avatar: creator.avatar,
                coverImage: creator.coverImage,
                bio: creator.bio,
                follower: followerCount,
                isFollowing: following,
                socials: creator.socials,
                createdAt: creator.createdAt,
                postCount: postCount,
            },

        });


    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}



export const getCreatorPost = async (req, res) => {
    const{ creatorId }= req.params;
    try{
        const posts = await PostModel.find({
            author: creatorId, 
            status: "public",
            isDeleted: false,       
        }).select("title coverImage views publishedAt").populate("author", "name avatar");


        return res.status(200).json({
            posts
        });


    }catch(error){
        return res.status(500).json({message: "Something went wrong"})
    }
}