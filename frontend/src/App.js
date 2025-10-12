import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardRedirect from "./pages/DashboardRedirect";

import NavBar from "./components/NavBar";
import AdminDashboard from "./pages/AdminDashboard";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AuthForms from "./components/AuthForms";

export default function App() {
  return (
    <Router>
      <NavBar />  {/* 👈 Navbar will be shown on all pages */}
      <Routes>
        <Route path="/" element={<AuthForms />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/hr" element={<HRDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}
