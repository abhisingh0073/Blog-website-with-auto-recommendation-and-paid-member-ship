import express from "express"
import userController from "../controllers/userController.js";
import { toggleFollow } from "../controllers/followController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { setInitialInterests } from "../controllers/userInterestController.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const { handleLogin, handleSignUp, handleLogOut , userProfile,updateProfile} = userController;



const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.get("/logout", handleLogOut);
router.get("/me", authMiddleware, (req, res) => {
    res.json({user: req.user});
});
router.get("/profile", authMiddleware, userProfile);


router.post("/:userIdToFollow", authMiddleware, toggleFollow);


router.post("/interests", authMiddleware, setInitialInterests);

router.put("/profile", authMiddleware, upload.fields([
    {name: "avatar", maxCount: 1},
    {name: "coverImage", maxCount: 1},
]), updateProfile)





export default router