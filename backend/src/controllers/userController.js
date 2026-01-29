import User from "../models/User.js";
import bcrypt from "bcrypt";
import{ matchPasswordAndGenerateToken, createTokenForUser} from "../services/authantication.js";

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


export default { handleSignUp, handleLogin, handleLogOut };