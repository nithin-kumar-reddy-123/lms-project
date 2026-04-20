package com.lms.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.lms.backend.entity.Issue;
import com.lms.backend.repository.IssueRepository;

@Service
public class NotificationService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private EmailService emailService;

    // Run daily at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void checkOverdueBooks() {
        List<Issue> issues = issueRepository.findAll();
        LocalDate today = LocalDate.now();

        for (Issue issue : issues) {
            if ("issued".equals(issue.getStatus()) && today.isAfter(issue.getDueDate())) {
                // Mark as overdue
                issue.setStatus("overdue");
                issueRepository.save(issue);

                // Send email notification
                String email = issue.getUser().getEmail();
                String subject = "Overdue Book Notification";
                String body = "Dear " + issue.getUser().getFullName() + ",\n\n" +
                        "The book '" + issue.getBook().getTitle() + "' is overdue. Please return it as soon as possible.\n\n" +
                        "Due Date: " + issue.getDueDate() + "\n" +
                        "Regards,\nLibrary Management System";

                emailService.sendEmail(email, subject, body);
            } else if ("issued".equals(issue.getStatus()) && today.plusDays(1).equals(issue.getDueDate())) {
                // Send reminder 1 day before due date
                String email = issue.getUser().getEmail();
                String subject = "Book Due Reminder";
                String body = "Dear " + issue.getUser().getFullName() + ",\n\n" +
                        "This is a reminder that the book '" + issue.getBook().getTitle() + "' is due tomorrow (" + issue.getDueDate() + ").\n\n" +
                        "Regards,\nLibrary Management System";

                emailService.sendEmail(email, subject, body);
            }
        }
    }
}