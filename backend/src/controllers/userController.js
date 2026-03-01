import User from "../models/User.js";
import bcrypt from "bcrypt";
import{ matchPasswordAndGenerateToken, createTokenForUser} from "../services/authantication.js";
import PostModel from "../models/PostModel.js";
import FollowModel from "../models/FollowModel.js";
import PostReactionModel from "../models/PostReactionModel.js";

async function handleSignUp(req, res) {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "All field are required "});
        }

        const userExist = await User.findOne({ email });
        if(userExist){
            return res.status(409).json({ message: " User already exists "});
        }

        const hashPassword = await bcrypt.hash(password, 10);

       const user = await User.create({
           name,
           email,
           password: hashPassword,
        });
           
       const token =  createTokenForUser(user);

       res.cookie("mindpost", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 1000,
       })

       return res.status(201).json({ message: "Signup Successful"});
       
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
     
}




async function handleLogin(req, res){
    const { email, password } = req.body;
    let token;
    try{
        token = await matchPasswordAndGenerateToken(email, password);

       return res.cookie("mindpost", token, {
       httpOnly: true,
       secure: false,
       sameSite: "lax",
       maxAge: 7 * 24 * 60 * 60 * 1000

       }).status(201).json({message : "Login Successful" });

    } catch(error){
        return res.status(401).json({message : error.message });
    }

    


}



async function handleLogOut(req, res){
  res.clearCookie("mindpost", {
    httpOnly: true,
    secure: false,      // true in production (HTTPS)
    sameSite: "lax",
  });

  return res.status(200).json({message: "Logged out successfully"})
}




async function userProfile(req, res){


        try{
            // const { userId } = req.params;
            const userId = req.user._id || null;
    
            const user = await User.findById(userId).select(
                "name avatar bio createdAt socials coverImage"
            );
    
            if(!user){
                return res.status(404).json({message: " User not found"});
            }
    
            const postCount = await PostModel.countDocuments({
                author: userId,
            });
    
    
            const follower = await FollowModel.countDocuments({
                following: userId,
            })
    

            return res.status(200).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    avatar: user.avatar,
                    coverImage: user.coverImage,
                    bio: user.bio,
                    socials: user.socials,
                    createdAt: user.createdAt,
                    postCount,
                    follower,
                    
                },
                
            });


    
    
        } catch(error){
            console.error(error);
            return res.status(500).json({ message: "Something went wrong" });
        }
}
    


async function updateProfile(req, res){
    try{
        const update = {};

        if(req.body.name) update.name = req.body.name;
        if(req.body.bio) update.bio = req.body.bio;

        if(req.body.socials){
            update.socials = typeof req.body.socials === 'string' ? JSON.parse(req.body.socials):req.body.socials;
        }

        if(req.files?.avatar) update.avatar = `/uploads/${req.user._id}/${req.files.avatar[0].filename}`;
        if(req.files?.coverImage) update.coverImage = `/uploads/${req.user._id}/${req.files.coverImage[0].filename}`;

        const user = await User.findByIdAndUpdate(req.user._id, update, {new: true }).select("-password");

        res.status(200).json({user, message: "profile updated successfully"});
    } catch(err){
        res.status(500).json({message: err.message})
    }
}



async function fetchUserPost(req, res){

    const postSelection = "_id coverImage title author views publishedAt createdAt status isMembersOnly"
    const user = req.user;

    const posts = await PostModel.find({author: user._id, isDeleted: false})
                 .select(postSelection)
                 .populate("author", "name avatar")
                 .sort({createdAt: -1});

    return res.status(200).json({posts});
}


async function followingData(req, res){

    const user = req.user;

    if(!user){
        return res.status(404).json({message: "User does not exist"});
    }

    const followingData = await FollowModel.find({
        follower: user._id,
    })
    .select("following")
    .populate("following", "name avatar");

    const creators = followingData.map(item => item.following);

    return res.status(200).json({creators});
}



async function likedPosts(req, res){
    try{
         const user = req.user;

         if(!user) return res.status(400).json({message: "You are not Login"});

    const fetchLikedPosts = await PostReactionModel.find({
        user: user._id,
    }).populate({
        path: "post",
        select: "title coverImage views author publishedAt",
        populate: {
            path: "author",
            select: "avatar name"
        }
    });

    const posts = fetchLikedPosts.map((item) => ({
        _id: item.post._id,
        coverImage: item.post.coverImage,
        title: item.post.title,
        views: item.post.views,
        author: item.post.author,
        publishedAt: item.post.publishedAt,
    }));

    return res.status(200).json({posts});

    } catch(err){
        return res.status(500).json({message: "Something went wrong"});
    }


}


export default { handleSignUp, handleLogin, handleLogOut, userProfile, updateProfile , fetchUserPost, followingData, likedPosts};