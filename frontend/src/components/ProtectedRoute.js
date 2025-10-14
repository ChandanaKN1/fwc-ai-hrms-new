import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1️⃣ Check Google session
        const sessionRes = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });

        if (sessionRes.ok) {
          setIsAuth(true);
          return;
        }

        // 2️⃣ Check local token
        const token = localStorage.getItem("token");
        if (token) {
          const verifyRes = await fetch("http://localhost:5000/api/auth/verify-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (verifyRes.ok) {
            const data = await verifyRes.json();
            // 🆕 Re-store user to keep role synced after restart
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.user.role);
            setIsAuth(true);
            return;
          }
        }

        setIsAuth(false);
      } catch (err) {
        console.error("ProtectedRoute error:", err);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <p>🔒 Checking authentication...</p>;
  }

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}
