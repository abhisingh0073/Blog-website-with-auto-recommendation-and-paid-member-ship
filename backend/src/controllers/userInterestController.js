import User from "../models/User.js";

export const setInitialInterests = async (req, res) => {
    try{
        const userId = req.user._id;
        const { interests } = req.body;

        if(!Array.isArray(interests) || interests.length === 0){
            return res.status(400).json({ message: "Invalid interests"});
        }

        const formatted = interests.map(tag => ({
            tag: tag.toLowerCase(),
            score: 5,
        }));

        await User.findByIdAndUpdate(userId, {
            interests: formatted,
        });

        return res.json({ message : " Interest saved successfully"});
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}