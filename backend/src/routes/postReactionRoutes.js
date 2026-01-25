import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { reactToPost } from "../controllers/postReactionController.js";

const postReactionRouter = express.Router();

postReactionRouter.post("/:postId", authMiddleware, reactToPost);

export default postReactionRouter;