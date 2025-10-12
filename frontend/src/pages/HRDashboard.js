import React from "react";
import DashboardCard from "../components/DashboardCard";

export default function HRDashboard() {
  const features = [
    { title: "Jobs", description: "Post openings and track applications.", buttonText: "Manage Jobs", color: "blue" },
    { title: "Bulk Resume Screening", description: "Upload resumes, view AI ranked candidates.", buttonText: "Open AI Screening", color: "yellow" },
    { title: "Interviews", description: "Schedule/manage interviews.", buttonText: "Open Interviews", color: "green" },
    { title: "Attendance & Leave", description: "Approve leaves and monitor trends.", buttonText: "Open Attendance", color: "blue" },
    { title: "Payroll", description: "View payroll summaries and records.", buttonText: "Open Payroll", color: "gray" },
    { title: "Analytics", description: "Recruitment and employee analytics.", buttonText: "Open Analytics", color: "green" },
  ];

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">HR Dashboard</h1>
      <div className="flex flex-wrap gap-6">
        {features.map((f, index) => (
          <DashboardCard key={index} {...f} />
        ))}
      </div>
    </div>
  );
}
