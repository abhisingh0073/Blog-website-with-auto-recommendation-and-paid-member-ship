import express from "express";
import { trackPostView } from "../controllers/postViewController.js";
const postViewRouter = express.Router();

postViewRouter.post("/:postId", trackPostView);

export default postViewRouter;