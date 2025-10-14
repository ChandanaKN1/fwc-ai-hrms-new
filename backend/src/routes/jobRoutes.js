import express from "express";
import Job from "../models/Job.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ HR/Admin can add jobs (protected)
router.post("/", protect, authorizeRoles("HR", "Admin"), async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const job = await Job.create({
      title,
      description,
      location,
      createdBy: req.user._id,
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to add job", error: err.message });
  }
});

// ✅ Candidate & others can view jobs (public)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

export default router;
