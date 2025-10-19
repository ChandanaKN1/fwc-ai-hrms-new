import React, { useEffect, useState } from "react";

export default function HRProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", deadline: "" });

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/projects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProjects(data);
  };

  const addProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(newProject),
    });
    setNewProject({ title: "", description: "", deadline: "" });
    fetchProjects();
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-8 pt-16 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Project Management (HR)</h1>

      <form onSubmit={addProject} className="bg-gray-800 p-4 rounded-lg mb-6">
        <input
          type="text"
          placeholder="Project Title"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          className="w-full p-2 mb-2 text-black"
          required
        />
        <textarea
          placeholder="Project Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          className="w-full p-2 mb-2 text-black"
          required
        />
        <input
          type="date"
          value={newProject.deadline}
          onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
          className="w-full p-2 mb-2 text-black"
          required
        />
        <button className="bg-blue-600 px-4 py-2 rounded">Add Project</button>
      </form>

      <h2 className="text-xl font-semibold mb-4">📜 Project List</h2>
      <table className="w-full text-left border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Deadline</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p._id} className="border-t border-gray-700">
              <td className="p-2">{p.title}</td>
              <td className="p-2">{p.description}</td>
              <td className="p-2">{new Date(p.deadline).toLocaleDateString()}</td>
              <td className="p-2">{p.status}</td>
              <td className="p-2">
                {p.status === "Active" ? (
                  <button onClick={() => updateStatus(p._id, "Completed")} className="bg-green-600 px-3 py-1 rounded">Mark Completed</button>
                ) : (
                  <button onClick={() => updateStatus(p._id, "Active")} className="bg-yellow-600 px-3 py-1 rounded">Make Active</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
