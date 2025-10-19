import React, { useEffect, useState } from "react";

export default function EmployeeProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/projects/employee", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const activeProject = projects.find((p) => p.status === "Active");
  const history = projects.filter((p) => p.status !== "Active");

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <>
          {/* 📌 Active Project */}
          {activeProject ? (
            <div className="bg-gray-800 p-4 rounded mb-6 shadow-lg">
              <h2 className="text-xl font-bold mb-2">📌 Active Project</h2>
              <p>
                <b>Title:</b> {activeProject.title}
              </p>
              <p>
                <b>Description:</b> {activeProject.description}
              </p>
              <p>
                <b>Deadline:</b>{" "}
                {new Date(activeProject.deadline).toLocaleDateString()}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span className="text-green-400 font-semibold">
                  {activeProject.status}
                </span>
              </p>
            </div>
          ) : (
            <p>No active project assigned.</p>
          )}

          {/* 📜 Project History */}
          <h2 className="text-xl font-bold mb-4">📜 Project History</h2>
          {history.length === 0 ? (
            <p>No past projects.</p>
          ) : (
            <ul className="space-y-3">
              {history.map((p) => (
                <li
                  key={p._id}
                  className="bg-gray-800 p-3 rounded shadow border border-gray-700"
                >
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-gray-300">{p.description}</p>
                  <p className="text-sm">
                    Deadline:{" "}
                    <span className="text-yellow-400">
                      {new Date(p.deadline).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">Status: {p.status}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
