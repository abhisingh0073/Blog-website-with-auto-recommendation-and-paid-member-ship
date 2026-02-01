import express from "express";
import { getCreatorProfile, getUserProfile } from "../controllers/profileController.js";

const profileRouter = express.Router();
profileRouter.get("/:userId", getUserProfile);
profileRouter.get("/creator/:userIdd", getCreatorProfile);


export default profileRouter;