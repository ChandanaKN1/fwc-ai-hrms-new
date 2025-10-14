import React from "react";
import DashboardCard from "../components/DashboardCard";

export default function AdminDashboard() {
  const features = [
    { title: "User & HR Management", description: "Manage HR accounts, employees, and system settings.", buttonText: "Employee Directory", color: "blue" },
    { title: "Analytics", description: "Hiring stats, attendance, payroll trends.", buttonText: "Open Analytics", color: "green" },
    { title: "System Tools", description: "Audit logs and configurations.", buttonText: "AI Chatbot", color: "gray" },
  ];

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {features.map((f, index) => (
          <DashboardCard key={index} {...f} />
        ))}
      </div>
    </div>
  );
}
