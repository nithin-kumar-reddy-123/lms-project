import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

function MyBooks() {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchIssues();
    }
  }, [user]);

  const fetchIssues = async () => {
    try {
      const response = await api.get(`/books/issues?email=${user.email}`);
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (issueId) => {
    try {
      const response = await api.post(`/books/return?issueId=${issueId}`);
      alert(response.data);
      fetchIssues(); // Refresh list
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Error returning book");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page">
      <div className="table-card">
        <h2 className="page-title">My Books</h2>
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
                  <td>{issue.fineAmount}</td>
                  <td>
                    {(issue.status === "issued" || issue.status === "overdue") && (
                      <button onClick={() => handleReturn(issue.id)}>Return</button>
                    )}
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