import User from "../models/User.js";

export const updateUserInterests = async (
    userId,
    tags = [],
    scoreDelta = 1
) => {
    if(!userId || !tags.length) return;

    const user = await User.findById(userId);
    if(!user) return;

    tags.forEach(tag => {
        const normalized = tag.toLowerCase();

        const existing = user.interests.find(i => i.tag === normalized);

        if(existing){
            existing.score += scoreDelta;
        } else{
            user.interests.push({
                tag: normalized,
                scoreDelta: scoreDelta,
            })
        }
    });

    await user.save();
}
