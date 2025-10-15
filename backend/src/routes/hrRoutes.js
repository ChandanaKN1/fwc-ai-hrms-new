import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import Attendance from "../models/Attendance.js";
import LeaveRequest from "../models/LeaveRequest.js";
import Payroll from "../models/Payroll.js";
import User from "../models/User.js";

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

router.get("/leave", protect, authorizeRoles("HR", "Admin"), async (req, res) => {
  const requests = await LeaveRequest.find().populate("employeeId", "name email");
  res.json(requests);
});

router.patch("/leave/:id", protect, authorizeRoles("HR", "Admin"), async (req, res) => {
  const { status } = req.body;
  const updated = await LeaveRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
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

export default router;
