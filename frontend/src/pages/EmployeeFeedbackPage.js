import React, { useState } from "react";

export default function EmployeeFeedbackPage() {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState("");

  const submitFeedback = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/employee/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, rating }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Feedback submitted successfully");
        setMessage("");
        setRating(5);
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong");
    }
  };

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Employee Feedback</h1>
      <div className="space-y-4 max-w-md mx-auto">
        <textarea
          placeholder="Enter your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 text-black rounded"
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 text-black rounded"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              Rating: {num}
            </option>
          ))}
        </select>
        <button
          onClick={submitFeedback}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Submit Feedback
        </button>
        {status && <p className="mt-2">{status}</p>}
      </div>
    </div>
  );
}
