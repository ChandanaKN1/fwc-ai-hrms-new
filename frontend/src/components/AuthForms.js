import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";

function AuthForms() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });

  // ✅ Show message if redirected from first-time Google OAuth
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const firstTime = params.get("firstTime");
    if (firstTime) {
      alert("👉 Please sign up using email and password for the first time.");
    }
  }, [location]);

  // Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🧠 Local Register/Login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const { data } = await API.post(endpoint, formData);

      // 🧠 Store token & role in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert(`${isLogin ? "Login" : "Signup"} successful!`);

      // ✅ Redirect to dashboard and let DashboardRedirect handle role routing
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Auth error:", err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  // 🌐 Google Login handler
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <select
            style={styles.input}
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
            <option value="Admin">Admin</option>
            <option value="Candidate">Candidate</option> {/* ✅ Added Candidate */}
          </select>
        )}
        <button style={styles.button} type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button style={styles.googleButton} onClick={handleGoogleLogin}>
        Login with Google
      </button>

      <p style={styles.switchText} onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "New user? Register here"
          : "Already have an account? Login here"}
      </p>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  form: { display: "inline-block", textAlign: "left", marginTop: "20px" },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "8px 12px",
    width: "250px",
  },
  button: {
    padding: "10px 20px",
    marginTop: "10px",
    backgroundColor: "#61dafb",
    border: "none",
    cursor: "pointer",
  },
  googleButton: {
    backgroundColor: "#DB4437",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    marginTop: "15px",
  },
  switchText: { color: "blue", marginTop: "20px", cursor: "pointer" },
  title: { color: "#282c34" },
};

export default AuthForms;
