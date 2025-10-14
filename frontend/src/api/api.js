import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Jobs
export const createJob = (jobData) => {
  const token = localStorage.getItem("token");
  return API.post("/jobs", jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllJobs = () => API.get("/jobs");

export default API;
