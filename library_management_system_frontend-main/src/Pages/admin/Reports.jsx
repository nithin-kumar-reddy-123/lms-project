import React, { useState, useEffect } from "react";
import API from "../../services/api";

function Reports() {
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState([]);
  const [analytics, setAnalytics] = useState({
    overdueBooks: 0,
    totalFineAmount: 0,
    activeIssuedBooks: 0,
  });

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      const booksRes = await API.get("/reports/most-borrowed?limit=10");
      const analyticsRes = await API.get("/reports/summary");
      
      setMostBorrowedBooks(booksRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  return (
    <div className="page">
      <h2 className="page-title">📊 Reports & Analytics</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
          <h3>Active Issued Books</h3>
          <p style={{ fontSize: "2em", fontWeight: "bold", color: "#007bff" }}>{analytics.activeIssuedBooks}</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
          <h3>Overdue Books</h3>
          <p style={{ fontSize: "2em", fontWeight: "bold", color: "#dc3545" }}>{analytics.overdueBooks}</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
          <h3>Total Pending Fine</h3>
          <p style={{ fontSize: "2em", fontWeight: "bold", color: "#28a745" }}>₹{analytics.totalFineAmount.toFixed(2)}</p>
        </div>
      </div>

      <div className="table-card">
        <h3 style={{ marginBottom: "20px" }}>Top 10 Most Borrowed Books</h3>
        
        {mostBorrowedBooks.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Borrow Count</th>
              </tr>
            </thead>
            <tbody>
              {mostBorrowedBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.borrowCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-text">No data available</p>
        )}
      </div>
    </div>
  );
}

export default Reports;
