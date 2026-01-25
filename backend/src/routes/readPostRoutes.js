import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getReadingHistory, markPostAsRead } from "../controllers/readPostController.js";

const readPostRouter = express.Router();

readPostRouter.post("/:postId", authMiddleware, markPostAsRead);
readPostRouter.get("/", authMiddleware, getReadingHistory);


export default readPostRouter;