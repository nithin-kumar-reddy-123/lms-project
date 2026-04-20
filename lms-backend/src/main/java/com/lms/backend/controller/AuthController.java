package com.lms.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.lms.backend.dto.AuthResponse;
import com.lms.backend.entity.User;
import com.lms.backend.repository.UserRepository;
import com.lms.backend.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Authentication", description = "User authentication APIs")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Register
    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Create a new user account with email and password")
    public String registerUser(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return "Email already exists!";
        }

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Registration successful!";
    }

    // Login
    @PostMapping("/login")
    @Operation(summary = "Login user", description = "Authenticate user and return JWT token")
    public AuthResponse loginUser(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            User userData = existingUser.get();

            // Verify password
            if (passwordEncoder.matches(user.getPassword(), userData.getPassword())) {
                String token = jwtUtil.generateToken(userData.getEmail(), userData.getRole());
                return new AuthResponse(token, userData.getEmail(), userData.getRole(), userData.getFullName());
            }
        }

        // Return error response with null token (frontend will check for this)
        return new AuthResponse(null, null, null, null);
    }

    // Update Profile
    @PutMapping("/update-profile")
    @Operation(summary = "Update user profile", description = "Update user's full name and email")
    public String updateProfile(@RequestBody User updatedUser) {
        Optional<User> existingUser = userRepository.findByEmail(updatedUser.getEmail());

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setFullName(updatedUser.getFullName());
            user.setEmail(updatedUser.getEmail());
            // Note: Password update not included for simplicity
            userRepository.save(user);
            return "Profile updated successfully!";
        } else {
            return "User not found";
        }
    }
}