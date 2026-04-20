import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    returnedBooks: 0,
  });

  const fetchStats = async () => {
    try {
      const booksRes = await API.get("/books");
      const issuesRes = await API.get("/books/all-issues");

      const books = booksRes.data;
      const issues = issuesRes.data;

      const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0);
      const borrowedBooks = issues.filter(issue => issue.status === "issued" || issue.status === "overdue").length;
      const returnedBooks = issues.filter(issue => issue.status === "returned").length;

      setStats({ totalBooks, borrowedBooks, returnedBooks });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="page">
      <h2 className="page-title">📊 Admin Dashboard</h2>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center', minWidth: '200px' }}>
          <h3>Total Books in Library</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#007bff' }}>{stats.totalBooks}</p>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center', minWidth: '200px' }}>
          <h3>Books Borrowed</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#28a745' }}>{stats.borrowedBooks}</p>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center', minWidth: '200px' }}>
          <h3>Books Returned</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#dc3545' }}>{stats.returnedBooks}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <Link to="/admin/books" className="dashboard-card">
          <h3>Manage Books</h3>
          <p>View and manage all books</p>
        </Link>
        <Link to="/admin/add-book" className="dashboard-card">
          <h3>Add Book</h3>
          <p>Add new books to library</p>
        </Link>
        <Link to="/admin/reports" className="dashboard-card">
          <h3>Reports & Analytics</h3>
          <p>View library statistics</p>
        </Link>
        <Link to="/admin/users" className="dashboard-card">
          <h3>User Management</h3>
          <p>Manage admin accounts and users</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;