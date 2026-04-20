package com.lms.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.lms.backend.entity.User;
import com.lms.backend.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create default admin account if no admin exists
        if (userRepository.findByEmail("admin@lms.com").isEmpty()) {
            User admin = new User();
            admin.setFullName("System Administrator");
            admin.setEmail("admin@lms.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");

            userRepository.save(admin);
            System.out.println("Default admin account created: admin@lms.com / admin123");
        }

        // Create sample student account
        if (userRepository.findByEmail("student@lms.com").isEmpty()) {
            User student = new User();
            student.setFullName("Sample Student");
            student.setEmail("student@lms.com");
            student.setPassword(passwordEncoder.encode("student123"));
            student.setRole("STUDENT");

            userRepository.save(student);
            System.out.println("Sample student account created: student@lms.com / student123");
        }

        // Create sample faculty account
        if (userRepository.findByEmail("faculty@lms.com").isEmpty()) {
            User faculty = new User();
            faculty.setFullName("Sample Faculty");
            faculty.setEmail("faculty@lms.com");
            faculty.setPassword(passwordEncoder.encode("faculty123"));
            faculty.setRole("FACULTY");

            userRepository.save(faculty);
            System.out.println("Sample faculty account created: faculty@lms.com / faculty123");
        }
    }
}
