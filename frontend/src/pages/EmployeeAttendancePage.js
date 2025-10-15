import React, { useState } from "react";

export default function EmployeeAttendancePage() {
  const [status, setStatus] = useState("");

  const handleMarkAttendance = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatus("❌ No token found. Please log in again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/employee/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(`✅ ${data.message}`);
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong");
    }
  };

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Employee Attendance</h1>
      <button
        onClick={handleMarkAttendance}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow-md"
      >
        Mark Attendance
      </button>
      {status && <p className="mt-4 text-lg">{status}</p>}
    </div>
  );
}
