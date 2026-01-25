import express from "express";
import{ authMiddleware} from "../middlewares/authMiddleware.js";
import { getUserFeed } from "../controllers/feedController.js";

const feedRouter = express.Router();

feedRouter.get("/", authMiddleware, getUserFeed);

export default feedRouter;
