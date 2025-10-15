import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");
    const roleFromURL = params.get("role");

    if (tokenFromURL) {
      // ✅ Clear old data
      localStorage.clear();

      // ✅ Store new token & role from URL (if provided)
      localStorage.setItem("token", tokenFromURL);
      if (roleFromURL) {
        localStorage.setItem("role", roleFromURL);
      }

      // Remove ?token=... from URL
      window.history.replaceState({}, document.title, "/dashboard");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const role = localStorage.getItem("role");

    switch (role) {
      case "HR":
        navigate("/hr");
        break;
      case "Employee":
        navigate("/employee");
        break;
      case "Admin":
        navigate("/admin");
        break;
      case "Candidate":
        navigate("/candidate");
        break;
      default:
        navigate("/");
        break;
    }
  }, [navigate]);

  return null;
}
