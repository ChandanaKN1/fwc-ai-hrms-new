import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // ✅ Check token for local logins
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      // ✅ Check Google session for OAuth logins
      fetch("http://localhost:5000/api/auth/user", { credentials: "include" })
        .then((res) => {
          if (res.ok) setLoggedIn(true);
        })
        .catch(() => setLoggedIn(false));
    }
  }, []);

  const handleLogout = async () => {
    // 🧹 Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // 🧼 Clear Google session if present
    await fetch("http://localhost:5000/api/auth/logout", {
      credentials: "include",
    });

    setLoggedIn(false);
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
