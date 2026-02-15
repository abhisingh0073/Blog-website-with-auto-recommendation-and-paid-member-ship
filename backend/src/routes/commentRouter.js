import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createComment, deleteComment, getComment, likeComment } from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.post("/like/:commentId", authMiddleware, likeComment)
commentRouter.get("/:postId", getComment);
commentRouter.post("/", authMiddleware, createComment);
commentRouter.delete("/:commentId", authMiddleware, deleteComment);


export default commentRouter;