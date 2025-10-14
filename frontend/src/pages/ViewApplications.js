import React, { useEffect, useState } from "react";
import { getAllJobs, getJobApplications } from "../api/api";

export default function ViewApplications() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState({});
  const [expandedJob, setExpandedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await getAllJobs();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const handleViewApplications = async (jobId) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
      return;
    }
    const { data } = await getJobApplications(jobId);
    setApplications((prev) => ({ ...prev, [jobId]: data }));
    setExpandedJob(jobId);
  };

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">📂 View Applications</h1>
      {jobs.length === 0 && <p>No jobs posted yet.</p>}
      {jobs.map((job) => (
        <div key={job._id} className="mb-4 bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-400">{job.location}</p>
            </div>
            <button
              onClick={() => handleViewApplications(job._id)}
              className="bg-blue-600 px-4 py-2 rounded text-white"
            >
              {expandedJob === job._id ? "Hide" : "View Applications"}
            </button>
          </div>

          {expandedJob === job._id && (
            <div className="mt-4 bg-gray-700 p-3 rounded-lg">
              {applications[job._id]?.length > 0 ? (
                <ul>
                  {applications[job._id].map((app) => (
                    <li key={app._id} className="mb-2 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{app.candidateName}</p>
                        <p className="text-sm text-gray-300">{app.candidateEmail}</p>
                      </div>
                      <a
                        href={`http://localhost:5000/${app.resumePath}`}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-600 px-3 py-1 rounded"
                      >
                        Download
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No applications yet.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
