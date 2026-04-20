import React, { useEffect, useState, useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

function SearchBooks() {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState({
    title: "",
    author: "",
    category: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    const params = new URLSearchParams();
    if (search.title) params.append("title", search.title);
    if (search.author) params.append("author", search.author);
    if (search.category) params.append("category", search.category);

    API.get(`/books?${params.toString()}`)
      .then((res) => setBooks(res.data))
      .catch(() => setBooks([]));
  };

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchBooks();
  };

  const handleBorrow = async (bookId) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const response = await API.post(`/books/borrow?email=${user.email}&collegeId=${user.email}&bookId=${bookId}`);
      alert(response.data);
      fetchBooks(); // Refresh the list to show updated quantity
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("Error borrowing book");
    }
  };

  const handleReserve = async (bookId) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const response = await API.post(`/reservations/reserve?email=${user.email}&bookId=${bookId}`);
      alert(response.data);
      fetchBooks(); // Refresh the list
    } catch (error) {
      console.error("Error reserving book:", error);
      alert("Error reserving book");
    }
  };

  return (
    <div className="page">
      <div className="table-card">
        <h2 className="page-title">Search Books</h2>

        <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            name="title"
            placeholder="Search by title"
            value={search.title}
            onChange={handleSearchChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Search by author"
            value={search.author}
            onChange={handleSearchChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Search by category"
            value={search.category}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Available</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.quantity}</td>
                    <td>
                      {book.quantity > 0 ? (
                        <button onClick={() => handleBorrow(book.id)}>Borrow</button>
                      ) : (
                        <button onClick={() => handleReserve(book.id)}>Reserve</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-text">
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