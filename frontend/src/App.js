import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import AuthForms from "./components/AuthForms";
import DashboardRedirect from "./pages/DashboardRedirect";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";

// 🆕 Import the new page
import ViewApplications from "./pages/ViewApplications";

export default function App() {
  return (
    <Router>
      {/* ✅ NavBar at the top for all pages */}
      <NavBar />

      <Routes>
        {/* Login / Signup */}
        <Route path="/" element={<AuthForms />} />

        {/* Common redirect after login */}
        <Route path="/dashboard" element={<DashboardRedirect />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* HR */}
        <Route
          path="/hr"
          element={
            <ProtectedRoute>
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🆕 HR - View Applications */}
        <Route
          path="/hr/applications"
          element={
            <ProtectedRoute>
              <ViewApplications />
            </ProtectedRoute>
          }
        />

        {/* Employee */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* Candidate */}
        <Route
          path="/candidate"
          element={
            <ProtectedRoute>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
