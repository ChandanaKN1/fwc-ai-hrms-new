import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import Attendance from "../models/Attendance.js";
import LeaveRequest from "../models/LeaveRequest.js";
import Feedback from "../models/Feedback.js";
import Payroll from "../models/Payroll.js"; // ✅ Added

const router = express.Router();

/* 🕒 Mark Attendance */
router.post("/attendance", protect, authorizeRoles("Employee"), async (req, res) => {
  try {
    const employeeId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyMarked = await Attendance.findOne({ employeeId, date: today });
    if (alreadyMarked) {
      return res.status(400).json({ message: "Already marked for today" });
    }

    const attendance = await Attendance.create({ employeeId, date: today, status: "Present" });
    res.json({ message: "Attendance marked", attendance });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark attendance" });
  }
});

/* 📝 Submit Leave Request */
router.post("/leave", protect, authorizeRoles("Employee"), async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const employeeId = req.user._id;

    const leave = await LeaveRequest.create({
      employeeId,
      startDate,
      endDate,
      reason,
      status: "Pending",
    });

    res.json({ message: "✅ Leave submitted successfully", leave });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit leave request" });
  }
});

/* 📊 Get Leave History for Employee */
router.get("/leave", protect, authorizeRoles("Employee"), async (req, res) => {
  try {
    const employeeId = req.user._id;
    const history = await LeaveRequest.find({ employeeId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leave history" });
  }
});

/* 💬 Submit Feedback */
router.post("/feedback", protect, authorizeRoles("Employee"), async (req, res) => {
  try {
    const { message, rating } = req.body;
    const employeeId = req.user._id;

    const feedback = await Feedback.create({ employeeId, message, rating });
    res.json({ message: "✅ Feedback submitted successfully", feedback });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit feedback" });
  }
});

/* 🧾 Get Payroll for Logged-in Employee ✅ */
router.get("/payroll", protect, authorizeRoles("Employee"), async (req, res) => {
  try {
    const employeeId = req.user._id;
    const payroll = await Payroll.find({ employeeId }).sort({ createdAt: -1 });

    if (!payroll.length) {
      return res.status(404).json({ message: "No payroll found for this employee" });
    }

    res.json(payroll);
  } catch (err) {
    console.error("Employee payroll fetch error:", err);
    res.status(500).json({ message: "Failed to fetch payroll" });
  }
});

export default router;
