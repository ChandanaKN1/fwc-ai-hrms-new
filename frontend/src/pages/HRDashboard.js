import React, { useState } from "react";
import DashboardCard from "../components/DashboardCard";
import { createJob } from "../api/api";

export default function HRDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [jobData, setJobData] = useState({ title: "", description: "", location: "" });

  const features = [
    {
      title: "Jobs",
      description: "Post openings and track applications.",
      buttonText: "Manage Jobs",
      color: "blue",
      onClick: () => setShowModal(true),
    },
    {
      title: "Bulk Resume Screening",
      description: "Upload resumes, view AI ranked candidates.",
      buttonText: "Open AI Screening",
      color: "yellow",
    },
    {
      title: "Interviews",
      description: "Schedule/manage interviews.",
      buttonText: "Open Interviews",
      color: "green",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(jobData);
      alert("✅ Job added successfully!");
      setShowModal(false);
      setJobData({ title: "", description: "", location: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add job");
    }
  };

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">HR Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {features.map((f, index) => (
          <DashboardCard key={index} {...f} />
        ))}
      </div>

      {/* Add Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add Job</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Job Title"
                value={jobData.title}
                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                className="w-full mb-3 p-2 border"
                required
              />
              <textarea
                placeholder="Description"
                value={jobData.description}
                onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                className="w-full mb-3 p-2 border"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={jobData.location}
                onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                className="w-full mb-3 p-2 border"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-3 py-1 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
