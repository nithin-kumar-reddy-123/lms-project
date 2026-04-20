import React, { useEffect, useState } from "react";
import API from "../../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    API.get("/books")
      .then((res) => setBooks(res.data))
      .catch(() => setBooks([]));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await API.delete(`/books/${id}`);
        fetchBooks(); // Refresh the list
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Error deleting book");
      }
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setEditForm({
      title: book.title,
      author: book.author,
      category: book.category,
      quantity: book.quantity,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/books/${editingBook.id}`, {
        ...editForm,
        quantity: parseInt(editForm.quantity),
      });
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book");
    }
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

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
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.quantity}</td>
                    <td>
                      <button onClick={() => handleEdit(book)}>Edit</button>
                      <button onClick={() => handleDelete(book.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-text">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingBook && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '400px'
          }}>
            <h3>Edit Book</h3>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editForm.title}
              onChange={handleEditChange}
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={editForm.author}
              onChange={handleEditChange}
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={editForm.category}
              onChange={handleEditChange}
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={editForm.quantity}
              onChange={handleEditChange}
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <button onClick={handleUpdate} style={{ marginRight: '10px' }}>Update</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;