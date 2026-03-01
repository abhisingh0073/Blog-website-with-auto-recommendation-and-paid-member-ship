import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getReadLaterPosts, isReadLaterPost, toggleReadLater } from "../controllers/readLaterController.js";
const readLaterRouter = express.Router();

readLaterRouter.get("/", authMiddleware, getReadLaterPosts);
readLaterRouter.get("/:postId", authMiddleware, isReadLaterPost);
readLaterRouter.post("/:postId", authMiddleware, toggleReadLater);

export default readLaterRouter;