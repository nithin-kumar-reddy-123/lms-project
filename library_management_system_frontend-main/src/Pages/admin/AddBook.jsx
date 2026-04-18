import React, { useState } from "react";
import API from "../../services/api";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    totalCopies: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/books", {
        ...book,
        totalCopies: parseInt(book.totalCopies, 10),
      });

      alert("Book added successfully");

      setBook({
        title: "",
        author: "",
        category: "",
        isbn: "",
        totalCopies: "",
      });
    } catch (error) {
      alert("Backend not connected yet");
      console.error(error);
    }
  };

  return (
    <div className="page">
      <div className="form-card">
        <h2 className="page-title">Add New Book</h2>

        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="title" placeholder="Book title" value={book.title} onChange={handleChange} required />
          <input type="text" name="author" placeholder="Author name" value={book.author} onChange={handleChange} required />
          <input type="text" name="category" placeholder="Category" value={book.category} onChange={handleChange} />
          <input type="text" name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} />
          <input type="number" name="totalCopies" placeholder="Total copies" value={book.totalCopies} onChange={handleChange} required />
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;