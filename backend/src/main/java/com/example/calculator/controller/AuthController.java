package com.example.calculator.controller;

import com.example.calculator.dto.LoginRequest;
import com.example.calculator.dto.RegisterRequest;
import com.example.calculator.entity.User;
import com.example.calculator.repository.UserRepository;
import com.example.calculator.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthController(UserRepository users, PasswordEncoder encoder, JwtService jwtService) {
        this.users = users;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (users.existsByEmail(request.email())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already registered"));
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(encoder.encode(request.password()));
        users.save(user);

        return ResponseEntity.ok(Map.of("message", "Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        return users.findByEmail(request.email())
            .filter(user -> encoder.matches(request.password(), user.getPassword()))
            .map(user -> ResponseEntity.ok(Map.of(
                "token", jwtService.generateToken(user.getEmail()),
                "user", Map.of("id", user.getId(), "name", user.getName(), "email", user.getEmail(), "role", user.getRole())
            )))
            .orElseGet(() -> ResponseEntity.status(401).body(Map.of("message", "Invalid email or password")));
    }
}
