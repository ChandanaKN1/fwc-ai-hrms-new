import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      fetch("http://localhost:5000/api/auth/user", { credentials: "include" })
        .then((res) => {
          if (res.ok) setLoggedIn(true);
          else setLoggedIn(false);
        })
        .catch(() => setLoggedIn(false));
    }
  };

  useEffect(() => {
    checkLogin();

    // ✅ Listen for login/logout in same tab
    window.addEventListener("authChange", checkLogin);

    return () => {
      window.removeEventListener("authChange", checkLogin);
    };
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    await fetch("http://localhost:5000/api/auth/logout", {
      credentials: "include",
    });

    setLoggedIn(false);
    // 🔥 Trigger update for NavBar instantly
    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/";
  };

  const isLoginPage = location.pathname === "/";

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#111827",
        padding: "10px 20px",
        color: "white",
      }}
    >
      <h2>HRMS System</h2>

      {!isLoginPage && loggedIn && (
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ef4444",
            padding: "8px 16px",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Logout
        </button>
      )}

      {isLoginPage && !loggedIn && (
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            backgroundColor: "#3b82f6",
            padding: "8px 16px",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Login
        </button>
      )}
    </nav>
  );
}
