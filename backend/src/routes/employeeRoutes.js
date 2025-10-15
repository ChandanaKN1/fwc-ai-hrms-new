import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import Attendance from "../models/Attendance.js";

const router = express.Router();

/* 🕒 Mark Attendance - Employee (Only once in 24 hrs) */
router.post("/attendance", protect, authorizeRoles("Employee"), async (req, res) => {
  try {
    const employeeId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyMarked = await Attendance.findOne({ employeeId, date: today });
    if (alreadyMarked) {
      return res.status(400).json({
        message: "🚨 You have already marked attendance for today.",
      });
    }

    const attendance = await Attendance.create({
      employeeId,
      date: today,
      status: "Present",
    });

    res.json({
      message: "✅ Attendance marked successfully!",
      attendance,
    });
  } catch (err) {
    console.error("Attendance error:", err);
    res.status(500).json({ message: "❌ Failed to mark attendance" });
  }
});

export default router;
