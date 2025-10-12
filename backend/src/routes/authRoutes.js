import express from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Normal login/register
router.post("/register", registerUser);
router.post("/login", loginUser);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
    session: true,
  }),
  (req, res) => {
    // You can create a JWT or just use req.user here
    const token = "GENERATE_YOUR_JWT_TOKEN"; // or use your existing token function
    const role = req.user.role;

    res.redirect(`http://localhost:3000/dashboard?token=${token}&role=${role}`);
  }
);

export default router;
