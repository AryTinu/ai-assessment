package com.aryan.ai_assessment.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final String SECRET_KEY =
            "myverysecuresecretkeyforjwtokenspringbootproject12345";

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Allow login and register APIs without JWT
        String path = request.getServletPath();

        if (path.startsWith("/api/auth")) {

            filterChain.doFilter(request, response);

            return;
        }

        // Get Authorization header
        String authHeader =
                request.getHeader("Authorization");

        // Check if token exists
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter()
                    .write("Missing JWT Token");

            return;
        }

        // Remove "Bearer "
        String token =
                authHeader.substring(7);

        try {

            // Validate token
            Claims claims =
                    Jwts.parser()
                            .setSigningKey(SECRET_KEY)
                            .parseClaimsJws(token)
                            .getBody();

            String email =
                    claims.getSubject();

            System.out.println(
                    "Authenticated User: " + email
            );

        } catch (Exception e) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter()
                    .write("Invalid JWT Token");

            return;
        }

        filterChain.doFilter(request, response);
    }
}