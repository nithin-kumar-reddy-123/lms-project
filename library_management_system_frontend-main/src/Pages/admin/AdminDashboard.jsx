import React, { useState, useEffect } from "react";
import API from "../../services/api";   // ✅ correct path

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    quantity: "",
  });

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");   // ✅ axios
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    try {
      await API.post("/books", {   // ✅ axios
        ...formData,
        quantity: parseInt(formData.quantity),
      });

      alert("Book Added");
      setFormData({ title: "", author: "", quantity: "" });
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/books/${id}`);   // ✅ axios
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Admin Dashboard</h2>

      <div>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} />
        <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

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
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;