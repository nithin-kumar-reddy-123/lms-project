package com.lms.backend.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.backend.entity.Book;
import com.lms.backend.entity.Issue;
import com.lms.backend.entity.User;
import com.lms.backend.repository.BookRepository;
import com.lms.backend.repository.IssueRepository;
import com.lms.backend.repository.UserRepository;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

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
        User user = userRepository.findByEmail(email).orElse(null);

        if (book == null) {
            return "Book not found";
        }

        if (user == null) {
            return "User not found";
        }

        if (book.getQuantity() <= 0) {
            return "Book out of stock";
        }

        // reduce quantity
        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);

        // save issue record
        Issue issue = new Issue();
        issue.setBook(book);
        issue.setUser(user);
        issue.setIssueDate(LocalDate.now());
        issue.setDueDate(LocalDate.now().plusDays(14)); // 14 days loan period
        issue.setStatus("issued");

        issueRepository.save(issue);

        return "Book borrowed successfully";
    }

    @Override
    public String returnBook(Long issueId) {
        Issue issue = issueRepository.findById(issueId).orElse(null);
        if (issue == null) {
            return "Issue not found";
        }

        if (!"issued".equals(issue.getStatus()) && !"overdue".equals(issue.getStatus())) {
            return "Book already returned";
        }

        LocalDate returnDate = LocalDate.now();
        issue.setReturnDate(returnDate);

        // Calculate fine if overdue
        if (returnDate.isAfter(issue.getDueDate())) {
            long daysOverdue = ChronoUnit.DAYS.between(issue.getDueDate(), returnDate);
            double fine = daysOverdue * 1.0; // 1 rupee per day
            issue.setFineAmount(fine);
        }

        issue.setStatus("returned");

        // Increase book quantity
        Book book = issue.getBook();
        book.setQuantity(book.getQuantity() + 1);
        bookRepository.save(book);

        issueRepository.save(issue);

        return "Book returned successfully. Fine: " + issue.getFineAmount();
    }

    @Override
    public List<Issue> getIssuesForUser(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return List.of();
        }
        return issueRepository.findByUser(user);
    }
}