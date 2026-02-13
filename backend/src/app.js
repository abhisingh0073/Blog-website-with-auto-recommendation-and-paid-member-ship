import express from 'express';
import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { checkForAuthenticaionCookies } from './middlewares/authMiddleware.js';
import passport from './config/passport.js';
import googleAuthRoutes from "./routes/googleAuthRoutes.js";
import postRoutes from './routes/postRoutes.js';
import postReactionRouter from './routes/postReactionRoutes.js';
import readLaterRouter from './routes/readLaterRouters.js';
import readPostRouter from './routes/readPostRoutes.js';
import postViewRouter from './routes/postViewRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import feedRouter from './routes/feedRoutes.js';
import recommendationsRouter from './routes/recommendationRoutes.js';

import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";
import membershipRouter from './routes/membershipRoutes.js';
import searchRoute from './routes/searchRoutes.js';
import notifiactionRouter from './routes/notificationRoutes.js';
import commentRouter from './routes/commentRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticaionCookies("mindpost"));
app.use(passport.initialize());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);


app.get("/", (req, res) => {
    if(!req.user){
        return res.send("welcome guest");
    }
    res.send(`welcome ${req.user.name}`)
});

app.use("/user", userRoute);
app.use("/auth", googleAuthRoutes);

app.use("/post", postRoutes);
app.use("/reaction", postReactionRouter)
app.use("/read-later", readLaterRouter);
app.use("/read-post", readPostRouter);
app.use("/post-view", postViewRouter);
app.use("/profile", profileRouter);
app.use("/feed", feedRouter);
app.use("/recommendations", recommendationsRouter)

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/membership", membershipRouter);
app.use("/search", searchRoute);
app.use("/notification", notifiactionRouter);
app.use("/comment", commentRouter);




export default app;