package com.aryan.ai_assessment.auth.controller;

import com.aryan.ai_assessment.auth.dto.LoginRequest;
import com.aryan.ai_assessment.auth.dto.RegisterRequest;
import com.aryan.ai_assessment.auth.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}