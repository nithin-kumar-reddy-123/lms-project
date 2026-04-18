package com.lms.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.backend.entity.Book;
import com.lms.backend.entity.Issue;
import com.lms.backend.repository.BookRepository;
import com.lms.backend.repository.IssueRepository;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Override
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public String borrowBook(String email, String collegeId, Long bookId) {

        Book book = bookRepository.findById(bookId).orElse(null);

        if (book == null) {
            return "Book not found";
        }

        if (book.getQuantity() <= 0) {
            return "Book out of stock";
        }

        // reduce quantity
        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);

        // save issue record
        Issue issue = new Issue();
        issue.setStudentEmail(email);
        issue.setCollegeId(collegeId);
        issue.setBookTitle(book.getTitle());
        issue.setIssueDate(LocalDate.now());

        issueRepository.save(issue);

        return "Book borrowed successfully";
    }
}