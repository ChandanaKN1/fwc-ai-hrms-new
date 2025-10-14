import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectBasedOnRole = (role) => {
      switch (role) {
        case "Admin":
          navigate("/admin");
          break;
        case "HR":
          navigate("/hr");
          break;
        case "Candidate":
          navigate("/candidate");
          break;
        case "Employee":
          navigate("/employee");
          break;
        default:
          navigate("/employee"); // fallback if role not recognized
      }
    };

    const checkUser = async () => {
      try {
        // ✅ First check Google session
        const res = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });

        if (res.ok) {
          const user = await res.json();
          console.log("🌐 Google Session Role:", user.role);
          redirectBasedOnRole(user.role);
          return;
        }

        // ✅ Then check local token & role
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        console.log("🧠 Local Role:", role);

        if (token && role) {
          redirectBasedOnRole(role);
          return;
        }

        navigate("/");
      } catch (error) {
        console.error("🚨 Redirect error:", error);
        navigate("/");
      }
    };

    checkUser();
  }, [navigate]);

  return <p>Redirecting...</p>;
}
