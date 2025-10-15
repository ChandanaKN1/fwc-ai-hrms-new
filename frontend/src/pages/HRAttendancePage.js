import React, { useEffect, useState } from "react";

export default function HRAttendancePage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/hr/attendance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setEmployees(data);
        }
      } catch (error) {
        console.error("Failed to fetch attendance", error);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Attendance Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Total Attendance</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="py-2 px-4">{emp.name}</td>
                  <td className="py-2 px-4">{emp.email}</td>
                  <td className="py-2 px-4">{emp.totalAttendance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
