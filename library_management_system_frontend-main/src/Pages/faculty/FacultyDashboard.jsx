import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function FacultyDashboard() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1 className="page-title">Welcome, {user?.name || "Faculty"}</h1>

      <div className="dashboard-grid">
        <Link to="/faculty/search-books" className="dashboard-card">
          <h3>Search Books</h3>
          <p>Browse and borrow books</p>
        </Link>
        <Link to="/faculty/my-books" className="dashboard-card">
          <h3>My Books</h3>
          <p>View borrowed books</p>
        </Link>
        <Link to="/faculty/profile" className="dashboard-card">
          <h3>My Profile</h3>
          <p>Update your information</p>
        </Link>
      </div>
    </div>
  );
}

export default FacultyDashboard;