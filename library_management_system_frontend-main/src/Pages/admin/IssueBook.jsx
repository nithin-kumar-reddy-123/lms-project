import React, { useState } from "react";
import API from "../../services/api";

function IssueBook() {
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");

  const handleIssue = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(`/loans/issue/${userId}/${bookId}`);
      alert(response.data);
      setUserId("");
      setBookId("");
    } catch (error) {
      alert("Backend not connected yet");
      console.error(error);
    }
  };

  return (
    <div className="page">
      <div className="form-card">
        <h2 className="page-title">Issue Book</h2>

        <form onSubmit={handleIssue} className="form">
          <input
            type="number"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Enter Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          />
          <button type="submit">Issue Book</button>
        </form>
      </div>
    </div>
  );
}

export default IssueBook;