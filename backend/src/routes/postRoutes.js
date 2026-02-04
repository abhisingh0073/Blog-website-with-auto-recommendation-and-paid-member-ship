import express from "express"
const postRoutes = express.Router();
import {createPost, deletePost, readPost, updatePost }from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; 
import { upload } from "../middlewares/uploadMiddleware.js";


postRoutes.post("/",authMiddleware,upload.single('coverImage'), createPost);
postRoutes.put("/:postId", authMiddleware, upload.single('coverImage'), updatePost);
postRoutes.delete("/delete/:postId", authMiddleware, deletePost);
postRoutes.get("/:postId", readPost);



export default postRoutes;