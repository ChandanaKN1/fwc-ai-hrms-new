// backend/app.js
import dotenv from "dotenv";
dotenv.config(); // ✅ Load env first

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js"; // 🆕 Added job routes

const app = express();

/* --------------------------------------------------
   ✅ 1. CORS — allow frontend & credentials for cookies (OAuth)
--------------------------------------------------- */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

/* --------------------------------------------------
   ✅ 2. JSON & Cookie parser
--------------------------------------------------- */
app.use(express.json());
app.use(cookieParser());

/* --------------------------------------------------
   ✅ 3. Session — needed for Google OAuth
--------------------------------------------------- */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false, // was true previously
    cookie: {
      httpOnly: true,
      secure: false, // ✅ set to true in production with HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

/* --------------------------------------------------
   ✅ 4. Passport middleware
--------------------------------------------------- */
app.use(passport.initialize());
app.use(passport.session());

/* --------------------------------------------------
   ✅ 5. Main routes
--------------------------------------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes); // 🆕 Job routes for HR & Candidate

/* --------------------------------------------------
   ✅ 6. Debug route — Google OAuth session check
--------------------------------------------------- */
app.get("/api/auth/user", (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }
  res.status(401).json({ message: "Not logged in" });
});

/* --------------------------------------------------
   ✅ 7. Health check
--------------------------------------------------- */
app.get("/", (req, res) => {
  res.send("🚀 HRMS Backend running successfully!");
});

/* --------------------------------------------------
   ✅ 8. Start server
--------------------------------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;
