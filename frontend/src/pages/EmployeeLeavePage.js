import React, { useState, useEffect } from "react";

export default function EmployeeLeavePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState([]);

  // ✅ Submit Leave Request
  const submitLeave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/employee/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ startDate, endDate, reason }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Leave submitted successfully");
        setStartDate("");
        setEndDate("");
        setReason("");
        fetchHistory(); // refresh history after submitting
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong");
    }
  };

  // 📜 Fetch Employee Leave History
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/employee/leave", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setHistory(data);
    } catch (err) {
      console.error("Error fetching leave history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Leave Request</h1>

      {/* 📝 Leave Form */}
      <div className="space-y-4 max-w-md mx-auto mb-8">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 text-black rounded"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 text-black rounded"
          placeholder="End Date"
        />
        <textarea
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 text-black rounded"
        />
        <button
          onClick={submitLeave}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Submit Leave Request
        </button>
        {status && <p className="mt-2">{status}</p>}
      </div>

      {/* 🕒 Leave History Table */}
      <h2 className="text-xl font-semibold mb-4">Your Leave History</h2>
      {history.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <table className="w-full text-left bg-gray-800 rounded">
          <thead>
            <tr>
              <th className="p-2">Start Date</th>
              <th className="p-2">End Date</th>
              <th className="p-2">Reason</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((req) => (
              <tr key={req._id} className="border-t border-gray-700">
                <td className="p-2">
                  {new Date(req.startDate).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {new Date(req.endDate).toLocaleDateString()}
                </td>
                <td className="p-2">{req.reason}</td>
                <td
                  className={`p-2 font-semibold ${
                    req.status === "Approved"
                      ? "text-green-400"
                      : req.status === "Rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {req.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
