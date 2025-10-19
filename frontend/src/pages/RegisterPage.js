import React, { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      role,
      // also include name, email, password from your existing form
    };

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Registered successfully");
    } else {
      alert(`❌ ${data.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-100 rounded shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {/* Role Dropdown only */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        className="p-2 border rounded w-full mb-3"
      >
        <option value="">Select Role</option>
        <option value="Employee">Employee</option>
        <option value="HR">HR</option>
        <option value="Admin">Admin</option>
        <option value="Candidate">Candidate</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Register
      </button>
    </form>
  );
}
