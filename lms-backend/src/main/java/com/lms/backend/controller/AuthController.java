package com.lms.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.lms.backend.entity.User;
import com.lms.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ✅ REGISTER
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return "Email already exists!";
        }

        userRepository.save(user);
        return "Registration successful!";
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public String loginUser(@RequestBody User loginUser) {

        System.out.println("Login Email: " + loginUser.getEmail());
        System.out.println("Login Password: " + loginUser.getPassword());

        try {
            Optional<User> user = userRepository.findByEmail(loginUser.getEmail());

            if (user.isPresent()) {
                User existingUser = user.get();

                System.out.println("DB Email: " + existingUser.getEmail());
                System.out.println("DB Password: " + existingUser.getPassword());
                System.out.println("DB Role: " + existingUser.getRole());

                if (existingUser.getPassword().equals(loginUser.getPassword())) {
                    return existingUser.getRole(); // ADMIN / STUDENT / FACULTY
                } else {
                    return "Invalid credentials";
                }
            } else {
                return "User not found";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred";
        }
    }
}