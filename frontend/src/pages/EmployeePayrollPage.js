import React, { useEffect, useState } from "react";
import PayrollSlip from "../components/PayrollSlip";
import { generatePayslipPDF } from "../utils/pdfGenerator"; // ✅ keep your file name

export default function EmployeePayrollPage() {
  const [payrolls, setPayrolls] = useState([]);
  const [filteredPayrolls, setFilteredPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const fetchPayroll = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/hr/payroll/employee", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setPayrolls(data);
          setFilteredPayrolls(data);
        } else {
          console.error("Failed to fetch payroll data:", res.statusText);
        }
      } catch (err) {
        console.error("Error fetching payroll data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, []);

  const handleFilter = () => {
    let result = payrolls;
    if (selectedMonth) {
      result = result.filter((p) => p.month?.split(" ")[0] === selectedMonth);
    }
    if (selectedYear) {
      result = result.filter((p) => p.month?.split(" ")[1] === selectedYear);
    }
    setFilteredPayrolls(result);
  };

  const clearFilter = () => {
    setSelectedMonth("");
    setSelectedYear("");
    setFilteredPayrolls(payrolls);
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = ["2023", "2024", "2025", "2026"];

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">My Payroll</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">Select Month</option>
          {months.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">Select Year</option>
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>

        <button
          onClick={handleFilter}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Apply Filter
        </button>
        <button
          onClick={clearFilter}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredPayrolls.length === 0 ? (
        <p>No payroll records found.</p>
      ) : (
        <div className="space-y-4">
          {filteredPayrolls.map((p) => (
            <div key={p._id} className="bg-gray-800 p-4 rounded-lg">
              <PayrollSlip payroll={p} />
              <button
                onClick={() => generatePayslipPDF(p)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white mt-2"
              >
                Download Payslip (PDF)
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
