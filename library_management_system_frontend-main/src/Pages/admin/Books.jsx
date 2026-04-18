import React, { useEffect, useState } from "react";
import API from "../../services/api";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/books")
      .then((res) => setBooks(res.data))
      .catch(() => setBooks([]));
  }, []);

  return (
    <div className="page">
      <div className="table-card">
        <h2 className="page-title">Manage Books</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>ISBN</th>
                <th>Total</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.bookId}>
                    <td>{book.bookId}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.isbn}</td>
                    <td>{book.totalCopies}</td>
                    <td>{book.availableCopies}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-text">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Books;