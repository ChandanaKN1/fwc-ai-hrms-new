import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

// ✅ CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// ✅ Debug: Check session user
app.get("/api/auth/user", (req, res) => {
  if (req.user) return res.json(req.user);
  res.status(401).json({ message: "Not logged in" });
});

app.get("/", (req, res) => res.send("🚀 HRMS Backend running successfully!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;
