import PostModel from "../models/PostModel.js";
import User from "../models/User.js";

export const searchPosts = async (req, res) => {
    try{
        const {q} = req.query;

        if(!q || q.trim()===""){
            return res.status(400).json({message: "Search query is required"});
        }

        const users = await User.find({
            name: {$regex: q, $options: "i"},
        }).select("_id");

        const userId = users.map(u => u._id);



        const posts = await PostModel.find({
            status: "public",
            isDeleted: false,
            $or: [
                {title: { $regex: q, $options: "i"}},
                {content: { $regex: q, $options: "i"} },
                { tags: {$regex: q, $options: "i"} },
                { author: { $in: userId } }, 
            ],
        }).populate("author", "name avatar")
          .sort({pubilshedAt: -1})
          .limit(20);


        res.json({posts});


    }catch(err){
        console.error(err);
        res.status(500).json({message: "Search failed"});
    }
}



export const searchSuggestion = async (req, res) => {

    try{
        const {q = ""} = req.query;
        if(!q) return res.json({suggestions: []});

        const posts = await PostModel.find({
            title: {$regex: q, $options: "i"},
            status: "public",
            isDeleted: false,
        }).select("title")
          .limit(5);


        const creator = await User.find({
            name: {$regex: q, $options: "i"},
        }).select("name")
          .limit(5);


        res.json({
            suggestions: [
                ...posts.map(p => ({ type: "post", text: p.title })),
                ...creator.map(u => ({type: "creator", text: u.name})),
            ]
        })


    }catch(err){
        res.status(500).json({message: "suggestion failed"});
    }
}