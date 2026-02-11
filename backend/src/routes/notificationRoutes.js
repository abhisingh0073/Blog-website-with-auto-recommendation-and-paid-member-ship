import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getMyNotifications,
  markAllAsRead,
} from "../controllers/notificationController.js";

const notifiactionRouter = express.Router();

notifiactionRouter.get("/", authMiddleware, getMyNotifications);
notifiactionRouter.put("/read", authMiddleware, markAllAsRead);

export default notifiactionRouter;
