package com.aryan.ai_assessment.auth.service;

import com.aryan.ai_assessment.auth.dto.AuthResponse;
import com.aryan.ai_assessment.auth.dto.LoginRequest;
import com.aryan.ai_assessment.auth.dto.RegisterRequest;

import com.aryan.ai_assessment.auth.jwt.JwtService;

import com.aryan.ai_assessment.user.entity.Role;
import com.aryan.ai_assessment.user.entity.User;

import com.aryan.ai_assessment.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository useRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    /* REGISTER */

    public String register(
            RegisterRequest request
    ) {

        /* CHECK USER EXISTS */

        User existingUser =

                useRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElse(null);

        if (existingUser != null) {

            return "Email already registered";
        }

        /* CREATE USER */

        User user = new User();

        user.setName(
                request.getName()
        );

        user.setEmail(
                request.getEmail()
        );

        /* ENCRYPT PASSWORD */

        user.setPassword(

                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole(
                Role.CANDIDATE
        );

        user.setCreatedAt(
                LocalDateTime.now()
        );

        /* SAVE USER */

        useRepository.save(user);

        return "User Registered Successfully";
    }

    /* LOGIN */

    public AuthResponse login(
            LoginRequest request
    ) {

        /* FIND USER */

        User user =

                useRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElse(null);

        if (user == null) {

            return null;
        }

        /* CHECK PASSWORD */

        boolean passwordMatch =

                passwordEncoder.matches(

                        request.getPassword(),

                        user.getPassword()
                );

        if (!passwordMatch) {

            return null;
        }

        /* GENERATE TOKEN */

        String token =

                jwtService.generateToken(
                        user.getEmail()
                );

        /* RETURN FULL RESPONSE */

        return new AuthResponse(

                user.getId(),

                user.getName(),

                user.getEmail(),

                token
        );
    }
}