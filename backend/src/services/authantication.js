import User from "../models/User.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const secretKey = process.env.secretKey;



export async function matchPasswordAndGenerateToken(email, password){
    const user = await User.findOne({email});
    if(!user) throw new Error("Email or Password is not Valid");

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("Email or Password is not Valid");

    const token = createTokenForUser(user);
    return token;
}


export function createTokenForUser(user){
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
    }
    const token = JWT.sign(payload, secretKey, { expiresIn: "7d"});
    return token;
}

export function validateToken(token){
    const payload = JWT.verify(token, secretKey);
    return payload;
}



// export default{ matchPasswordAndGenerateToken, createTokenForUser};