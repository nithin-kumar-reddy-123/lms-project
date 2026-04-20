import React, { useState } from "react";
import API from "../../services/api";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/books", {
        ...book,
        quantity: parseInt(book.quantity, 10),
      });

      alert("Book added successfully");

      setBook({
        title: "",
        author: "",
        category: "",
        quantity: "",
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
          <input type="number" name="quantity" placeholder="Quantity" value={book.quantity} onChange={handleChange} required />
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;