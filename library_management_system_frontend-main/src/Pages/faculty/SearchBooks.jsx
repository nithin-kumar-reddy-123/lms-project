import React, { useEffect, useState } from "react";
import API from "../../services/api";

function SearchBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/books")
      .then((res) => setBooks(res.data))
      .catch(() => setBooks([]));
  }, []);

  return (
    <div className="page">
      <div className="table-card">
        <h2 className="page-title">Search Books</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.bookId}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.availableCopies}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-text">
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

export default SearchBooks;