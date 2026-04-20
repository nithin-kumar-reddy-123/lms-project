package com.lms.backend.service;

import java.util.List;
import com.lms.backend.entity.Book;
import com.lms.backend.entity.Issue;

public interface BookService {

    Book addBook(Book book);

    List<Book> getAllBooks(String title, String author, String category);

    Book getBookById(Long id);

    void deleteBook(Long id);

    Book updateBook(Long id, Book bookDetails);

    String borrowBook(String email, String collegeId, Long bookId);

    String returnBook(Long issueId);

    List<Issue> getAllIssues();

    List<Issue> getUserIssues(String email);

    String payFine(Long issueId);
}