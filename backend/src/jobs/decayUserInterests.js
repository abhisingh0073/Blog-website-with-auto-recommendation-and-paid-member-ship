import User from "../models/User.js";

export const decayUserInterests = async ()=> {
    const users = await User.find({ "interests.0" : { $exists: true } });

    for( const user of user ){
        user.interests.forEach(i => {
            i.scores *= 0.95;
        });

        //remove low score interests
        user.interests = user.interests.filter(i => i.score>1);
        await user.save();
    }

    console.log("User interests decayed");
}