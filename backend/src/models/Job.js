import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
