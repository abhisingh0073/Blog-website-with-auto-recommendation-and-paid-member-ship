import express from "express";
import { getCreatorPost, getCreatorProfile, getUserProfile } from "../controllers/profileController.js";

const profileRouter = express.Router();
profileRouter.get("/creator-post/:creatorId",getCreatorPost)
profileRouter.get("/creator/:creatorId", getCreatorProfile);
profileRouter.get("/:userId", getUserProfile);


export default profileRouter;