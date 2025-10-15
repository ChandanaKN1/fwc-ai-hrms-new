import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  baseSalary: Number,
  bonus: Number,
  deductions: Number,
  netPay: Number,
  month: String
});

export default mongoose.model("Payroll", payrollSchema);
