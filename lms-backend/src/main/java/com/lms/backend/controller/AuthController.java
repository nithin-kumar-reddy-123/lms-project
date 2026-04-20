package com.lms.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.lms.backend.dto.AuthResponse;
import com.lms.backend.dto.PasswordChangeRequest;
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

    // Create Admin Account (Admin Only)
    @PostMapping("/create-admin")
    @Operation(summary = "Create admin account", description = "Admin only - Create a new admin account")
    public String createAdmin(@RequestBody User adminUser) {
        // This endpoint should be secured with @PreAuthorize("hasRole('ADMIN')") in production
        // For now, it's accessible but should only be called by authorized personnel

        Optional<User> existingUser = userRepository.findByEmail(adminUser.getEmail());

        if (existingUser.isPresent()) {
            return "Email already exists!";
        }

        adminUser.setPassword(passwordEncoder.encode(adminUser.getPassword()));
        adminUser.setRole("ADMIN");
        userRepository.save(adminUser);
        return "Admin account created successfully!";
    }

    // Change Password (For any user)
    @PostMapping("/change-password")
    @Operation(summary = "Change user password", description = "Change password for authenticated user")
    public String changePassword(@RequestBody PasswordChangeRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            User user = existingUser.get();

            // Verify current password
            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                return "Current password is incorrect";
            }

            // Update to new password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            return "Password changed successfully!";
        } else {
            return "User not found";
        }
    }

    // Get All Users (Admin Only)
    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Admin only - Get list of all users")
    public java.util.List<User> getAllUsers() {
        // This endpoint should be secured with @PreAuthorize("hasRole('ADMIN')") in production
        return userRepository.findAll();
    }
}