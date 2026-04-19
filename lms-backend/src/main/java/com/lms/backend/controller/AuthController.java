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

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return "Email already exists!";
        }

        userRepository.save(user);
        return "Registration successful!";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User loginUser) {
        Optional<User> user = userRepository.findByEmail(loginUser.getEmail());

        if (user.isPresent()) {
            User existingUser = user.get();

            if (existingUser.getPassword().equals(loginUser.getPassword())) {
                return existingUser.getRole();
            } else {
                return "Invalid credentials";
            }
        } else {
            return "User not found";
        }
    }
}



        catch (Exception e) {
            e.printStackTrace();
            return "Error occurred";
        }
    
