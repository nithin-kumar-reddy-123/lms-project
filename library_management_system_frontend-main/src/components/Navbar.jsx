import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">📚 LibraryMS</div>

      <div className="nav-links">
        {user.role === "ADMIN" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/books">Books</Link>
            <Link to="/admin/add-book">Add Book</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/reports">Reports</Link>
          </>
        )}

        {user.role === "STUDENT" && (
          <>
            <Link to="/student/dashboard">Dashboard</Link>
            <Link to="/student/search-books">Search Books</Link>
            <Link to="/student/my-books">My Books</Link>
          </>
        )}

        {user.role === "FACULTY" && (
          <>
            <Link to="/faculty/dashboard">Dashboard</Link>
            <Link to="/faculty/search-books">Search Books</Link>
            <Link to="/faculty/my-books">My Books</Link>
          </>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;