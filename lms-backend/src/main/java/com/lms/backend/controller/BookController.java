
package com.lms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.lms.backend.entity.Book;
import com.lms.backend.entity.Issue;
import com.lms.backend.service.BookService;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
@Tag(name = "Books", description = "Book management APIs")
public class BookController {

    @Autowired
    private BookService bookService;

    // ✅ Add Book
    @PostMapping
    @Operation(summary = "Add a new book", description = "Admin only - Add a book to library inventory")
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    // ✅ Get All Books with Search
    @GetMapping
    @Operation(summary = "Get all books", description = "Retrieve all books with optional filters (title, author, category)")
    public List<Book> getAllBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String category) {
        return bookService.getAllBooks(title, author, category);
    }

    // ✅ Get Book by ID
    @GetMapping("/{id}")
    @Operation(summary = "Get book by ID", description = "Retrieve a specific book by its ID")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    // ✅ Update Book
    @PutMapping("/{id}")
    @Operation(summary = "Update book", description = "Admin only - Update book details")
    public Book updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return bookService.updateBook(id, bookDetails);
    }

    // ✅ Delete Book
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete book", description = "Admin only - Remove a book from inventory")
    public String deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return "Book deleted successfully";
    }

    // ✅ Borrow Book
    @PostMapping("/borrow")
    @Operation(summary = "Borrow a book", description = "Student/Faculty - Borrow a book from library")
    public String borrowBook(
            @RequestParam String email,
            @RequestParam String collegeId,
            @RequestParam Long bookId) {

        return bookService.borrowBook(email, collegeId, bookId);
    }

    // ✅ Return Book
    @PostMapping("/return")
    @Operation(summary = "Return a book", description = "Return a borrowed book")
    public String returnBook(@RequestParam Long issueId) {
        return bookService.returnBook(issueId);
    }

    // ✅ Get All Issues (for Admin)
    @GetMapping("/all-issues")
    @Operation(summary = "Get all book issues", description = "Admin only - View all issued books")
    public List<Issue> getAllIssues() {
        return bookService.getAllIssues();
    }

    // ✅ Get User Issues
    @GetMapping("/issues")
    @Operation(summary = "Get user's issued books", description = "Get all books issued to the current user")
    public List<Issue> getUserIssues(@RequestParam String email) {
        return bookService.getUserIssues(email);
    }

    // ✅ Pay Fine
    @PostMapping("/pay-fine")
    @Operation(summary = "Pay fine for overdue book", description = "Mark fine as paid for an overdue book")
    public String payFine(@RequestParam Long issueId) {
        return bookService.payFine(issueId);
    }
}
