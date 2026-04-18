import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    quantity: "",
  });

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:8082/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add book
  const handleAddBook = async () => {
    try {
      await fetch("http://localhost:8082/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          quantity: parseInt(formData.quantity),
        }),
      });

      alert("Book Added");
      setFormData({ title: "", author: "", quantity: "" });
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete book
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8082/api/books/${id}`, {
        method: "DELETE",
      });

      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Admin Dashboard</h2>

      {/* Add Book Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      {/* Book List */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.quantity}</td>
              <td>
                <button onClick={() => handleDelete(book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;