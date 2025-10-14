import express from "express";
import passport from "passport";
import { registerUser, loginUser, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-token", verifyToken);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  (req, res) => {
    const role = req.user.role;
    const token = "OAUTH_SESSION_TOKEN";
    res.redirect(`http://localhost:3000/dashboard?role=${role}&token=${token}`);
  }
);

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user);
  res.status(401).json({ message: "Unauthorized" });
});

export default router;
