import express from "express";
import passport from "passport";
import { registerUser, loginUser, verifyToken } from "../controllers/authController.js";

const router = express.Router();

// Local Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-token", verifyToken);

// Google OAuth - Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth - Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000?firstTime=true" }),
  (req, res) => {
    // ✅ Redirect to dashboard; role will be fetched from session
    res.redirect("http://localhost:3000/dashboard");
  }
);

// Get current logged-in user
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user);
  res.status(401).json({ message: "Unauthorized" });
});

// Google Logout (optional)
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

export default router;
