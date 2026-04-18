import React from "react";
import { useAuth } from "../../context/AuthContext";

function FacultyDashboard() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1 className="page-title">Welcome, {user?.name || "Faculty"}</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Borrowed Books</h3>
          <p>3</p>
        </div>
        <div className="dashboard-card">
          <h3>Reserved Books</h3>
          <p>1</p>
        </div>
        <div className="dashboard-card">
          <h3>Due Books</h3>
          <p>1</p>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;