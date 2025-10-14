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
          navigate("/employee");
      }
    };

    const checkUser = async () => {
      try {
        // 1️⃣ Check Google session
        const res = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });
        if (res.ok) {
          const user = await res.json();
          console.log("🌐 Google Session Role:", user.role);
          redirectBasedOnRole(user.role);
          return;
        }

        // 2️⃣ Check stored user
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.role) {
            console.log("🧠 Stored User Role:", parsedUser.role);
            redirectBasedOnRole(parsedUser.role);
            return;
          }
        }

        // 3️⃣ Check token and role separately
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role) {
          console.log("🧠 Local Role:", role);
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
