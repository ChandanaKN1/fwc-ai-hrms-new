import React, { useEffect, useState } from "react";

export default function HRFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/hr/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFeedbacks(data);
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Employee Feedback</h1>
      {feedbacks.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((f) => (
            <div key={f._id} className="bg-gray-800 p-4 rounded-lg">
              <p className="font-semibold text-lg">{f.employeeId?.name}</p>
              <p className="text-sm text-gray-400 mb-2">{f.employeeId?.email}</p>
              <p className="text-lg">{f.message}</p>
              <p className="text-yellow-400 mt-2">Rating: {f.rating} ⭐</p>
              <p className="text-sm text-gray-400">
                {new Date(f.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
