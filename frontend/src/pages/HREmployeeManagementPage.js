import React, { useEffect, useState } from "react";

export default function HREmployeeManagementPage() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/hr/employees", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Employee Management</h1>
      <table className="w-full text-left border border-gray-700 mb-6">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="border-t border-gray-700">
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
