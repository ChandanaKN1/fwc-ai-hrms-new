import React from "react";
import DashboardCard from "../components/DashboardCard";

export default function EmployeeDashboard() {
  const features = [
    { title: "Apply & Resume", description: "Apply for jobs and upload resume.", buttonText: "Find Jobs", color: "blue" },
    { title: "Assessments", description: "Take gamified assessments.", buttonText: "Start Assessment", color: "yellow" },
    { title: "Video Interview", description: "Attend or review interview.", buttonText: "Open Interview", color: "green" },
    { title: "Attendance", description: "Mark attendance and request leave.", buttonText: "Open Attendance", color: "blue" },
    { title: "Payroll", description: "View payslips and salary details.", buttonText: "Open Payroll", color: "gray" },
    { title: "Chatbot", description: "Ask FAQs about status, leave, payroll.", buttonText: "Open Chatbot", color: "green" },
  ];

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
      <div className="flex flex-wrap gap-6">
        {features.map((f, index) => (
          <DashboardCard key={index} {...f} />
        ))}
      </div>
    </div>
  );
}
