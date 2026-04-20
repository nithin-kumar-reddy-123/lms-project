import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

function MyBooks() {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchIssuesAndReservations();
    }
  }, [user]);

  const fetchIssuesAndReservations = async () => {
    try {
      const issuesRes = await api.get(`/books/issues?email=${user.email}`);
      const reservationsRes = await api.get(`/reservations?email=${user.email}`);
      setIssues(issuesRes.data);
      setReservations(reservationsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (issueId) => {
    try {
      const response = await api.post(`/books/return?issueId=${issueId}`);
      alert(response.data);
      fetchIssuesAndReservations(); // Refresh list
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Error returning book");
    }
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      const response = await api.delete(`/reservations/${reservationId}`);
      alert(response.data);
      fetchIssuesAndReservations(); // Refresh list
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      alert("Error cancelling reservation");
    }
  };

  const handlePayFine = async (issueId, fineAmount) => {
    if (window.confirm(`Pay fine of ₹${fineAmount.toFixed(2)}?`)) {
      try {
        const response = await api.post(`/books/pay-fine?issueId=${issueId}`);
        alert(response.data);
        fetchIssuesAndReservations(); // Refresh list
      } catch (error) {
        console.error("Error paying fine:", error);
        alert("Error paying fine");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page">
      <div className="table-card">
        <h2 className="page-title">My Borrowed Books</h2>
        {issues.length === 0 ? (
          <p className="empty-text">No borrowed books yet</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Fine</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.book.title}</td>
                  <td>{issue.issueDate}</td>
                  <td>{issue.dueDate}</td>
                  <td>{issue.status}</td>
                  <td>{issue.fineAmount > 0 ? `₹${issue.fineAmount.toFixed(2)}` : "₹0"}</td>
                  <td>{issue.paymentStatus}</td>
                  <td>
                    {(issue.status === "issued" || issue.status === "overdue") && (
                      <button onClick={() => handleReturn(issue.id)}>Return</button>
                    )}
                    {issue.fineAmount > 0 && issue.paymentStatus === "unpaid" && (
                      <button onClick={() => handlePayFine(issue.id, issue.fineAmount)} style={{ marginLeft: "5px", background: "#28a745" }}>
                        Pay Fine
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="table-card">
        <h2 className="page-title">My Reservations</h2>
        {reservations.filter(r => r.status === "active").length === 0 ? (
          <p className="empty-text">No active reservations</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Reservation Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.filter(r => r.status === "active").map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.book.title}</td>
                  <td>{reservation.reservationDate}</td>
                  <td>{reservation.status}</td>
                  <td>
                    <button onClick={() => handleCancelReservation(reservation.id)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyBooks;