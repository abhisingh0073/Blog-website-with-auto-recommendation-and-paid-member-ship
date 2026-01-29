import express from "express"
import userController from "../controllers/userController.js";
import { toggleFollow } from "../controllers/followController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { setInitialInterests } from "../controllers/userInterestController.js";
const { handleLogin, handleSignUp, handleLogOut } = userController;


const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.get("/logout", handleLogOut);
router.get("/me", authMiddleware, (req, res) => {
    res.json({user: req.user});
});


router.post("/:userIdToFollow", authMiddleware, toggleFollow);


router.post("/interests", authMiddleware, setInitialInterests);





export default router