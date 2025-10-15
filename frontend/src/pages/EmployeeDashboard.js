import React from "react";
import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const features = [
    { title: "Projects", description: "View, manage, and collaborate on assigned projects.", buttonText: "Open Projects", color: "yellow" },
    { title: "Attendance", description: "Mark attendance and request leave.", buttonText: "Open Attendance", color: "blue", onClick: () => navigate("/employee/attendance") },
    { title: "Payroll", description: "View payslips and salary details.", buttonText: "Open Payroll", color: "gray" },
    { title: "Chatbot", description: "Ask FAQs about status, leave, payroll.", buttonText: "Open Chatbot", color: "green" },
  ];

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {features.map((f, index) => (
          <DashboardCard key={index} {...f} />
        ))}
      </div>
    </div>
  );
}
