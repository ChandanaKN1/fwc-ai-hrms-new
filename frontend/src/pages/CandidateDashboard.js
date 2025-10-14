import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import { getAllJobs } from "../api/api";

export default function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await getAllJobs();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const features = [
    {
      title: "AI Interview",
      description: "Take mock interviews with AI interviewer and get feedback.",
      buttonText: "Start AI Interview",
      color: "yellow",
    },
    {
      title: "Discover Jobs",
      description: "Browse available job openings.",
      buttonText: "Find Jobs",
      color: "blue",
    },
  ];

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Candidate Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-8">
        {features.map((f, i) => (
          <DashboardCard key={i} {...f} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Available Jobs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-bold mb-1">{job.title}</h3>
              <p className="text-sm text-gray-300 mb-1">{job.description}</p>
              <p className="text-sm text-gray-400">{job.location}</p>
            </div>
          ))
        ) : (
          <p>No jobs available yet.</p>
        )}
      </div>
    </div>
  );
}
