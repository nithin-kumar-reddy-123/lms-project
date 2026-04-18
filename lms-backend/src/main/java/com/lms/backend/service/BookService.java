package com.lms.backend.service;

import java.util.List;
import com.lms.backend.entity.Book;

public interface BookService {

    Book addBook(Book book);

    List<Book> getAllBooks();

    void deleteBook(Long id);

    String borrowBook(String email, String collegeId, Long bookId);
}