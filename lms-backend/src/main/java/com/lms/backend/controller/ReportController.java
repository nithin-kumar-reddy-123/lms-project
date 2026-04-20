package com.lms.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.lms.backend.service.ReportService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // ✅ Get most borrowed books
    @GetMapping("/most-borrowed")
    public List<Map<String, Object>> getMostBorrowedBooks(@RequestParam(defaultValue = "10") int limit) {
        return reportService.getMostBorrowedBooks(limit);
    }

    // ✅ Get analytics summary
    @GetMapping("/summary")
    public Map<String, Object> getAnalyticsSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("overdueBooks", reportService.getOverdueBooksCount());
        summary.put("totalFineAmount", reportService.getTotalFineAmount());
        summary.put("activeIssuedBooks", reportService.getActiveIssuedBooksCount());
        return summary;
    }
}
