import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import { getAllJobs } from "../api/api";

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [showJobs, setShowJobs] = useState(false);
  const [resumeFiles, setResumeFiles] = useState({}); // store file per job ID
  const [candidateData, setCandidateData] = useState({}); // store name/email per job ID

  // 🔸 Fetch jobs when Find Jobs is clicked
  const handleFindJobs = async () => {
    const { data } = await getAllJobs();
    setJobs(data);
    setShowJobs(true);
  };

  // 📝 Handle input change for each job separately
  const handleInputChange = (e, jobId) => {
    const { name, value } = e.target;
    setCandidateData((prev) => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        [name]: value,
      },
    }));
  };

  // 📎 Handle file selection for each job separately
  const handleFileChange = (e, jobId) => {
    const file = e.target.files[0];
    setResumeFiles((prev) => ({
      ...prev,
      [jobId]: file,
    }));
  };

  // 📤 Submit application for the selected job
  const handleApply = async (jobId) => {
    const data = candidateData[jobId] || {};
    const resumeFile = resumeFiles[jobId];

    if (!resumeFile) {
      alert("Please upload your resume first");
      return;
    }

    if (!data.name || !data.email) {
      alert("Please enter your name and email");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("name", data.name);
    formData.append("email", data.email);

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/apply`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("✅ Application submitted successfully!");
        setCandidateData((prev) => ({
          ...prev,
          [jobId]: { name: "", email: "" },
        }));
        setResumeFiles((prev) => ({
          ...prev,
          [jobId]: null,
        }));
      } else {
        alert("❌ Failed to apply for the job");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    }
  };

  const features = [
    {
      title: "AI Interview",
      description: "Take mock interviews with AI interviewer and get feedback.",
      buttonText: "Start AI Interview",
      color: "yellow",
      onClick: () => navigate("/candidate/ai_interview"),
    },
    {
      title: "Discover Jobs",
      description: "Browse available job openings.",
      buttonText: "Find Jobs",
      color: "blue",
      onClick: handleFindJobs,
    },
    {
      title: "Resume Builder",
      description: "Build a professional resume with AI-powered suggestions.",
      buttonText: "Build Resume",
      color: "green",
    },
    {
      title: "Skill Tracker",
      description: "Track and improve your skill progress over time.",
      buttonText: "View Skills",
      color: "gray",
    },
  ];

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Candidate Dashboard</h1>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-8">
        {features.map((f, i) => (
          <DashboardCard key={i} {...f} />
        ))}
      </div>

      {/* Job Section */}
      {showJobs && (
        <>
          <h2 className="text-xl font-bold mb-4">Available Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.length > 0 ? (
              jobs.map((job) => {
                const data = candidateData[job._id] || { name: "", email: "" };
                return (
                  <div
                    key={job._id}
                    className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                      <p className="text-sm text-gray-300 mb-1">{job.description}</p>
                      <p className="text-sm text-gray-400">{job.location}</p>
                    </div>

                    <div className="mt-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={data.name}
                        onChange={(e) => handleInputChange(e, job._id)}
                        className="mb-2 p-2 text-black w-full rounded"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={data.email}
                        onChange={(e) => handleInputChange(e, job._id)}
                        className="mb-2 p-2 text-black w-full rounded"
                      />
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, job._id)}
                        className="mb-2 block w-full text-sm text-gray-300"
                      />
                      <button
                        onClick={() => handleApply(job._id)}
                        className="bg-green-600 hover:bg-green-700 w-full text-white py-2 rounded"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No jobs available yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
