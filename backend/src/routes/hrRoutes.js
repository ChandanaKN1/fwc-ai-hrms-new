import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import Attendance from "../models/Attendance.js";
import LeaveRequest from "../models/LeaveRequest.js";
import Payroll from "../models/Payroll.js";
import User from "../models/User.js";
import Feedback from "../models/Feedback.js"; // ✅ Added

const router = express.Router();

/* 🕒 Get All Attendance - HR */
router.get("/attendance", protect, authorizeRoles("HR", "Admin"), async (req, res) => {
  try {
    const employees = await User.find({ role: "Employee" }).select("name email");
    const attendanceRecords = await Attendance.find();

    const result = employees.map((emp) => {
      const empRecords = attendanceRecords.filter(
        (r) => r.employeeId.toString() === emp._id.toString()
      );
      return {
        _id: emp._id,
        name: emp.name,
        email: emp.email,
        totalAttendance: empRecords.length,
        dates: empRecords.map((r) => r.date),
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attendance records" });
  }
});

/* 📝 Get All Leave Requests - HR */
router.get("/leave", protect, authorizeRoles("HR", "Admin"), async (req, res) => {
  try {
    const requests = await LeaveRequest.find()
      .populate("employeeId", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Leave fetch error:", error);
    res.status(500).json({ message: "Failed to fetch leave requests" });
  }
});

/* ✍️ Approve / Reject Leave Request - HR */
router.patch("/leave/:id", protect, authorizeRoles("HR", "Admin"), async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.json({ message: `✅ Leave ${status.toLowerCase()} successfully`, updated });
  } catch (error) {
    console.error("Leave update error:", error);
    res.status(500).json({ message: "Failed to update leave request" });
  }
});

/* 💰 Payroll */
router.get("/employees", protect, authorizeRoles("HR", "Admin"), async (req, res) => {
  const employees = await User.find({ role: "Employee" }).select("name email role");
  res.json(employees);
});

router.post("/payroll", protect, authorizeRoles("HR", "Admin"), async (req, res) => {
  const { employeeId, baseSalary, bonus, deductions, month } = req.body;
  const netPay = baseSalary + bonus - deductions;
  const payroll = await Payroll.create({ employeeId, baseSalary, bonus, deductions, netPay, month });
  res.json(payroll);
});

router.get("/payroll", protect, authorizeRoles("HR", "Admin"), async (req, res) => {
  const records = await Payroll.find().populate("employeeId", "name email");
  res.json(records);
});

/* 🆕 📩 Get All Feedback (HR) */
router.get("/feedback", protect, authorizeRoles("HR", "Admin"), async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("employeeId", "name email")
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (err) {
    console.error("Feedback fetch error:", err);
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
});

export default router;
