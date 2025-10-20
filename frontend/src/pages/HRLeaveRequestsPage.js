import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function HRLeaveRequestsPage() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/hr/leave", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setRequests(data);
  };

  const handleAction = async (id, status) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/hr/leave/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Leave Requests</h1>
      {requests.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <table className="w-full text-left bg-gray-800 rounded">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Start Date</th>
              <th className="p-2">End Date</th>
              <th className="p-2">Reason</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-t border-gray-700">
                <td className="p-2">{req.employeeId?.name}</td>
                <td className="p-2">{req.employeeId?.email}</td>
                <td className="p-2">{new Date(req.startDate).toLocaleDateString()}</td>
                <td className="p-2">{new Date(req.endDate).toLocaleDateString()}</td>
                <td className="p-2">{req.reason}</td>
                <td className="p-2">{req.status}</td>
                <td className="p-2 space-x-2">
                  {req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleAction(req._id, "Approved")}
                        className="bg-green-600 px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req._id, "Rejected")}
                        className="bg-red-600 px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
}
