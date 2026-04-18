
package com.lms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lms.backend.entity.Book;
import com.lms.backend.service.BookService;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    // ✅ Add Book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    // ✅ Get All Books
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // ✅ Delete Book
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return "Book deleted successfully";
    }

    // ✅ Borrow Book (NEW)
    @PostMapping("/borrow")
    public String borrowBook(
            @RequestParam String email,
            @RequestParam String collegeId,
            @RequestParam Long bookId) {

        return bookService.borrowBook(email, collegeId, bookId);
    }
}
