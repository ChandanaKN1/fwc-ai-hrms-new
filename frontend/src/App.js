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
import ViewApplications from "./pages/ViewApplications";

import EmployeeAttendancePage from "./pages/EmployeeAttendancePage";
import HRAttendancePage from "./pages/HRAttendancePage";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<AuthForms />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hr"
          element={
            <ProtectedRoute>
              <HRDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/applications"
          element={
            <ProtectedRoute>
              <ViewApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/attendance"
          element={
            <ProtectedRoute>
              <HRAttendancePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/attendance"
          element={
            <ProtectedRoute>
              <EmployeeAttendancePage />
            </ProtectedRoute>
          }
        />

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
