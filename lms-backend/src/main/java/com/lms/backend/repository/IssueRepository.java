package com.lms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lms.backend.entity.Issue;

public interface IssueRepository extends JpaRepository<Issue, Long> {
}