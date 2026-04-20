package com.lms.backend.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.backend.entity.Issue;
import com.lms.backend.repository.IssueRepository;
import com.lms.backend.repository.BookRepository;

@Service
public class ReportService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private BookRepository bookRepository;

    // Get most borrowed books
    public List<Map<String, Object>> getMostBorrowedBooks(int limit) {
        List<Issue> allIssues = issueRepository.findAll();
        
        return allIssues.stream()
                .collect(Collectors.groupingBy(
                        issue -> issue.getBook().getTitle(),
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .sorted((a, b) -> Long.compare(b.getValue(), a.getValue()))
                .limit(limit)
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("title", entry.getKey());
                    map.put("borrowCount", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());
    }

    // Get overdue books count
    public long getOverdueBooksCount() {
        List<Issue> allIssues = issueRepository.findAll();
        return allIssues.stream()
                .filter(issue -> "overdue".equals(issue.getStatus()))
                .count();
    }

    // Get total fine amount
    public double getTotalFineAmount() {
        List<Issue> allIssues = issueRepository.findAll();
        return allIssues.stream()
                .mapToDouble(Issue::getFineAmount)
                .sum();
    }

    // Get active issued books count
    public long getActiveIssuedBooksCount() {
        List<Issue> allIssues = issueRepository.findAll();
        return allIssues.stream()
                .filter(issue -> "issued".equals(issue.getStatus()) || "overdue".equals(issue.getStatus()))
                .count();
    }
}
