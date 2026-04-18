import React from "react";
import { useAuth } from "../../context/AuthContext";

function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1 className="page-title">Welcome, {user?.name || "Student"}</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Borrowed Books</h3>
          <p>2</p>
        </div>
        <div className="dashboard-card">
          <h3>Due Books</h3>
          <p>1</p>
        </div>
        <div className="dashboard-card">
          <h3>Fine Amount</h3>
          <p>₹0</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;