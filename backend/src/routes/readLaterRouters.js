import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getReadLaterPosts, toggleReadLater } from "../controllers/readLaterController.js";
const readLaterRouter = express.Router();

readLaterRouter.post("/:postId", authMiddleware, toggleReadLater);
readLaterRouter.get("/", authMiddleware, getReadLaterPosts);

export default readLaterRouter;