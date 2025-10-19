import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import AuthForms from "./components/AuthForms";
import DashboardRedirect from "./pages/DashboardRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import { ChatbotProvider } from "./context/ChatbotContext";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";

// Common Pages
import ViewApplications from "./pages/ViewApplications";
import EmployeeAttendancePage from "./pages/EmployeeAttendancePage";
import HRAttendancePage from "./pages/HRAttendancePage";

// 🆕 New Pages
import EmployeePayrollPage from "./pages/EmployeePayrollPage";
import EmployeeLeavePage from "./pages/EmployeeLeavePage";
import EmployeeFeedbackPage from "./pages/EmployeeFeedbackPage";
import HREmployeeManagementPage from "./pages/HREmployeeManagementPage";
import HRFeedbackPage from "./pages/HRFeedbackPage";
import HRLeaveRequestsPage from "./pages/HRLeaveRequestsPage";
import ResumeScreeningPage from "./pages/ResumeScreeningPage";

export default function App() {
  return (
    <Router>
      <ChatbotProvider>
        <NavBar />
        <Routes>
        {/* ==============================
           AUTHENTICATION
        ============================== */}
        <Route path="/" element={<AuthForms />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />

        {/* ==============================
           ADMIN DASHBOARD
        ============================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ==============================
           HR DASHBOARD
        ============================== */}
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
        {/* 🆕 HR: Employee Management */}
        <Route
          path="/hr/employee-management"
          element={
            <ProtectedRoute>
              <HREmployeeManagementPage />
            </ProtectedRoute>
          }
        />
        {/* 🆕 HR: Feedback Management */}
        <Route
          path="/hr/feedback"
          element={
            <ProtectedRoute>
              <HRFeedbackPage />
            </ProtectedRoute>
          }
        />
        {/* 🆕 HR: Leave Management */}
        <Route
          path="/hr/leave"
          element={
            <ProtectedRoute>
              <HRLeaveRequestsPage />
            </ProtectedRoute>
          }
        />
        {/* 🆕 HR: Resume Screening */}
        <Route
          path="/hr/resume-screening"
          element={
            <ProtectedRoute>
              <ResumeScreeningPage />
            </ProtectedRoute>
          }
        />

        {/* ==============================
           EMPLOYEE DASHBOARD
        ============================== */}
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
        {/* 🆕 Employee: Payroll */}
        <Route
          path="/employee/payroll"
          element={
            <ProtectedRoute>
              <EmployeePayrollPage />
            </ProtectedRoute>
          }
        />
        {/* 🆕 Employee: Leave */}
        <Route
          path="/employee/leave"
          element={
            <ProtectedRoute>
              <EmployeeLeavePage />
            </ProtectedRoute>
          }
        />
        {/* 🆕 Employee: Feedback */}
        <Route
          path="/employee/feedback"
          element={
            <ProtectedRoute>
              <EmployeeFeedbackPage />
            </ProtectedRoute>
          }
        />

        {/* ==============================
           CANDIDATE DASHBOARD
        ============================== */}
        <Route
          path="/candidate"
          element={
            <ProtectedRoute>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      </ChatbotProvider>
    </Router>
  );
}
