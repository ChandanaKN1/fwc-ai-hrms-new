import React, { useEffect, useState } from "react";

export default function EmployeePayrollPage() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/hr/payroll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        // Filter only logged-in employee's payroll
        const user = JSON.parse(localStorage.getItem("user"));
        const filtered = data.filter((p) => p.employeeId._id === user.id);
        setPayrolls(filtered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchPayroll();
  }, []);

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">My Payroll</h1>
      {loading ? (
        <p>Loading...</p>
      ) : payrolls.length === 0 ? (
        <p>No payroll records found.</p>
      ) : (
        <table className="w-full text-left border border-gray-700 mt-4">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2">Month</th>
              <th className="p-2">Base Salary</th>
              <th className="p-2">Bonus</th>
              <th className="p-2">Deductions</th>
              <th className="p-2">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((p) => (
              <tr key={p._id} className="border-t border-gray-700">
                <td className="p-2">{p.month}</td>
                <td className="p-2">₹{p.baseSalary}</td>
                <td className="p-2">₹{p.bonus}</td>
                <td className="p-2">₹{p.deductions}</td>
                <td className="p-2 font-bold text-green-400">₹{p.netPay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
