package com.lms.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lms.backend.entity.Issue;
import com.lms.backend.entity.User;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByUser(User user);
}