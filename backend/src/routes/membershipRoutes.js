import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createMembershipOrder, verifyMembershipPayment } from "../controllers/membershipController.js";


const membershipRouter = express.Router();

membershipRouter.post("/create-order", authMiddleware, createMembershipOrder);
membershipRouter.post("/verify", authMiddleware, verifyMembershipPayment);

export default membershipRouter;