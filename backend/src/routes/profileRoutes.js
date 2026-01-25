import express from "express";
import { getUserProfile } from "../controllers/profileController.js";

const profileRouter = express.Router();
profileRouter.get("/:userId", getUserProfile);


export default profileRouter;