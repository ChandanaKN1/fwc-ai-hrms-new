import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { registerUser, loginUser, verifyToken } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* 🧑 Local Auth */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-token", verifyToken);

/* 🔐 Google OAuth - Login */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

/* 🔐 Google OAuth - Callback */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000?firstTime=true" }),
  (req, res) => {
    // ✅ Issue JWT after Google login
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Redirect to frontend with token in URL
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

/* 👤 Get current user with JWT */
router.get("/user", protect, (req, res) => {
  if (req.user) return res.json(req.user);
  res.status(401).json({ message: "Unauthorized" });
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, department, designation, baseSalary, joinDate } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role: role || "Employee",
      department: department || "Not Assigned",
      designation: designation || "Not Assigned",
      baseSalary: baseSalary || 30000,
      joinDate: joinDate || new Date(),
    });

    res.json({ message: "✅ Registration successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});


/* 🚪 Logout */
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

export default router;
