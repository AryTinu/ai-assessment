package com.aryan.ai_assessment.auth.controller;

import com.aryan.ai_assessment.auth.dto.AuthResponse;
import com.aryan.ai_assessment.auth.dto.LoginRequest;
import com.aryan.ai_assessment.auth.dto.RegisterRequest;

import com.aryan.ai_assessment.auth.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    /* REGISTER */

    @PostMapping("/register")
    public String register(

            @RequestBody RegisterRequest request

    ) {

        return authService.register(request);
    }

    /* LOGIN */

    @PostMapping("/login")
    public AuthResponse login(

            @RequestBody LoginRequest request

    ) {

        return authService.login(request);
    }
}