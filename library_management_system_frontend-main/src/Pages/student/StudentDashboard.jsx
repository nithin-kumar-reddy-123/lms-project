import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">Welcome, {user?.name || "Student"}</h1>

      <div className="dashboard-grid">
        <Link to="/student/search-books" className="dashboard-card">
          <h3>Search Books</h3>
          <p>Browse and borrow books</p>
        </Link>
        <Link to="/student/my-books" className="dashboard-card">
          <h3>My Books</h3>
          <p>View borrowed books</p>
        </Link>
        <Link to="/student/profile" className="dashboard-card">
          <h3>My Profile</h3>
          <p>Update your information</p>
        </Link>
      </div>
    </div>
  );
}

export default StudentDashboard;