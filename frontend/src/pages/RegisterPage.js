import React, { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { role };

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Top Branding */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            HRMS Portal
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Register to access the system
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
          >
            <option value="">Select Role</option>
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
            <option value="Admin">Admin</option>
            <option value="Candidate">Candidate</option>
          </select>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">Or continue with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() =>
            (window.location.href = "http://localhost:5000/api/auth/google")
          }
          className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 py-3 rounded-lg transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Login with Google</span>
        </button>

        {/* Link to Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-black font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
