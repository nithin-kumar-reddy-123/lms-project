import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <div className="hero-card">
        <h1>Welcome to Library Management System</h1>
        <p>
          Manage books, issue records, and library operations with a clean and
          modern interface.
        </p>

        <div className="hero-buttons">
          <Link to="/books" className="primary-btn">
            View Books
          </Link>
          <Link to="/add-book" className="secondary-btn">
            Add New Book
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;