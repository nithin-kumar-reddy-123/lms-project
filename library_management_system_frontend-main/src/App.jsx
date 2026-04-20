import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import AdminDashboard from "./Pages/admin/AdminDashboard";
import Books from "./Pages/admin/Books";
import AddBook from "./Pages/admin/AddBook";
import IssueBook from "./Pages/admin/IssueBook";
import Reports from "./Pages/admin/Reports";
import AdminUsers from "./Pages/admin/AdminUsers";

import StudentDashboard from "./Pages/student/StudentDashboard";
import StudentSearchBooks from "./Pages/student/SearchBooks";
import StudentMyBooks from "./Pages/student/MyBooks";
import StudentProfile from "./Pages/student/Profile";

import FacultyDashboard from "./Pages/faculty/FacultyDashboard";
import FacultySearchBooks from "./Pages/faculty/SearchBooks";
import FacultyMyBooks from "./Pages/faculty/MyBooks";
import FacultyProfile from "./Pages/faculty/Profile";

function DefaultRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
  if (user.role === "STUDENT") return <Navigate to="/student/dashboard" replace />;
  if (user.role === "FACULTY") return <Navigate to="/faculty/dashboard" replace />;

  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DefaultRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Books />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-book"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/issue-book"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <IssueBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/search-books"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentSearchBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/my-books"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentMyBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/search-books"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultySearchBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/my-books"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyMyBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/profile"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;