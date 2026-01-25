import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getRecommendations } from "../controllers/recommendationController.js";

const recommendationsRouter = express.Router();
recommendationsRouter.get("/", getRecommendations);


export default recommendationsRouter;