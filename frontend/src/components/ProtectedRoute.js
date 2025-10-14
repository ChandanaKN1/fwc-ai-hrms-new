// frontend/src/components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 🟢 1. Check Google session
        const sessionRes = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });

        if (sessionRes.ok) {
          setIsAuth(true);
          return;
        }

        // 🟡 2. Check local JWT token
        const token = localStorage.getItem("token");
        if (token) {
          const verifyRes = await fetch("http://localhost:5000/api/auth/verify-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (verifyRes.ok) {
            setIsAuth(true);
            return;
          }
        }

        // 🚫 3. If neither session nor token is valid
        setIsAuth(false);
      } catch (err) {
        console.error("ProtectedRoute error:", err);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <p>🔒 Checking authentication...</p>; // small loader while checking
  }

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}
