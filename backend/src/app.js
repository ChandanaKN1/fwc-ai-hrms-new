import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import "./config/passport.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

// 🧭 Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* --------------------------------------------------
   ✅ 1. CORS
--------------------------------------------------- */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

/* --------------------------------------------------
   ✅ 2. Middleware
--------------------------------------------------- */
app.use(express.json());
app.use(cookieParser());

/* --------------------------------------------------
   ✅ 3. Session
--------------------------------------------------- */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

/* --------------------------------------------------
   ✅ 4. Passport
--------------------------------------------------- */
app.use(passport.initialize());
app.use(passport.session());

/* --------------------------------------------------
   ✅ 5. Static folder for resumes (uploads)
--------------------------------------------------- */
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* --------------------------------------------------
   ✅ 6. Routes
--------------------------------------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

/* --------------------------------------------------
   ✅ 7. Debug route — check session user
--------------------------------------------------- */
app.get("/api/auth/user", (req, res) => {
  if (req.user) return res.json(req.user);
  res.status(401).json({ message: "Not logged in" });
});

/* --------------------------------------------------
   ✅ 8. Health check
--------------------------------------------------- */
app.get("/", (req, res) => {
  res.send("🚀 HRMS Backend running successfully!");
});

/* --------------------------------------------------
   ✅ 9. Start server
--------------------------------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;
