import React, { useEffect, useState } from "react";

export default function HRPayrollPage() {
  const [payrolls, setPayrolls] = useState([]);
  const [status, setStatus] = useState("Draft");
  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // ✅ Salary structure inputs
  const [baseSalary, setBaseSalary] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [deduction, setDeduction] = useState(0);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = ["2023", "2024", "2025", "2026"];

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/hr/payroll", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPayrolls(data);
  };

  const generatePayroll = async () => {
    if (!selectedMonth || !selectedYear) {
      alert("⚠️ Please select payroll month and year.");
      return;
    }

    const token = localStorage.getItem("token");
    const body = {
      month: `${selectedMonth} ${selectedYear}`,
      baseSalary: Number(baseSalary),
      allowance: Number(allowance),
      deduction: Number(deduction),
    };

    const res = await fetch("http://localhost:5000/api/hr/payroll/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setStatus("Approved");
      setShowModal(false);
      fetchPayroll();
      alert("✅ Payroll generated successfully");
    } else {
      alert("❌ Failed to generate payroll");
    }
  };

  const releasePayroll = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/hr/payroll/release", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setStatus("Released");
      alert("✅ Payroll released. Employees can now view payslips.");
    } else {
      alert("❌ Failed to release payroll");
    }
  };

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      {/* Header & Status */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Payroll Management (HR)</h1>
        <div className="flex gap-3">
          <span
            className={`px-3 py-1 rounded-full ${
              status === "Released"
                ? "bg-green-600"
                : status === "Approved"
                ? "bg-yellow-600"
                : "bg-gray-600"
            }`}
          >
            {status}
          </span>
          {status === "Draft" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 px-4 py-2 rounded"
            >
              Generate Payroll
            </button>
          )}
          {status === "Approved" && (
            <button
              onClick={releasePayroll}
              className="bg-green-600 px-4 py-2 rounded"
            >
              Approve & Release
            </button>
          )}
        </div>
      </div>

      {/* Payroll table */}
      <table className="w-full text-left border border-gray-700 mt-4">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2">Employee</th>
            <th className="p-2">Month</th>
            <th className="p-2">Basic</th>
            <th className="p-2">Allowance</th>
            <th className="p-2">Deduction</th>
            <th className="p-2">Net Pay</th>
            {/* 🟢 Removed PDF Action column */}
          </tr>
        </thead>
        <tbody>
          {payrolls.map((p) => (
            <tr key={p._id} className="border-t border-gray-700">
              <td className="p-2">{p.employeeId?.name}</td>
              <td className="p-2">{p.month}</td>
              <td className="p-2">₹{p.baseSalary}</td>
              <td className="p-2">₹{p.bonus}</td>
              <td className="p-2">₹{p.deductions}</td>
              <td className="p-2 text-green-400 font-bold">₹{p.netPay}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for payroll input */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Generate Payroll</h2>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            >
              <option value="">Select Month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={baseSalary}
              onChange={(e) => setBaseSalary(e.target.value)}
              placeholder="Enter Base Salary"
              className="p-2 rounded w-full mb-3 border"
            />

            <input
              type="number"
              value={allowance}
              onChange={(e) => setAllowance(e.target.value)}
              placeholder="Enter Allowance (if any)"
              className="p-2 rounded w-full mb-3 border"
            />

            <input
              type="number"
              value={deduction}
              onChange={(e) => setDeduction(e.target.value)}
              placeholder="Enter Deductions (if any)"
              className="p-2 rounded w-full mb-3 border"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={generatePayroll}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
