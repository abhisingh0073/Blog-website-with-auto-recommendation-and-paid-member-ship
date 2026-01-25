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
app.use("/post/reaction", postReactionRouter)
app.use("/read-later", readLaterRouter);
app.use("/read-post", readPostRouter);
app.use("/post-view", postViewRouter);
app.use("/profile", profileRouter);
app.use("/feed", feedRouter);
app.use("/recommendations", recommendationsRouter)





export default app;