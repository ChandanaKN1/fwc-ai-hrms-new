import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const role = params.get("role");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "Admin") navigate("/admin");
      else if (role === "HR") navigate("/hr");
      else navigate("/employee");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return null;
}
