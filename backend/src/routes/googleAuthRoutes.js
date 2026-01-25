import express from "express";
import passport from "passport";
import { createTokenForUser } from "../services/authantication.js";

const router = express.Router();

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    console.log(req.user);
    const token = createTokenForUser(req.user);

    res.cookie("mindpost", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect("/");
  }
);

export default router;
