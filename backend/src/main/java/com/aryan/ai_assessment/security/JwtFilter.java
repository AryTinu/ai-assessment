package com.aryan.ai_assessment.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication
        .UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context
        .SecurityContextHolder;

import org.springframework.security.web.authentication
        .WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import java.util.Collections;

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

        /* CURRENT PATH */

        String path =
                request.getServletPath();

        /* PUBLIC ROUTES */

        if (

                path.startsWith("/api/auth") ||

                path.startsWith("/swagger-ui") ||

                path.startsWith("/v3/api-docs")

        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        /* GET AUTH HEADER */

        String authHeader =
                request.getHeader(
                        "Authorization"
                );

        /* TOKEN VALIDATION */

        if (

                authHeader == null ||

                !authHeader.startsWith(
                        "Bearer "
                )

        ) {

            response.setStatus(
                    HttpServletResponse
                            .SC_UNAUTHORIZED
            );

            response.getWriter()
                    .write("Missing JWT Token");

            return;
        }

        /* REMOVE BEARER */

        String token =
                authHeader.substring(7);

        try {

            /* PARSE TOKEN */

            Claims claims =
                    Jwts.parser()

                            .setSigningKey(
                                    SECRET_KEY
                            )

                            .parseClaimsJws(
                                    token
                            )

                            .getBody();

            /* EXTRACT EMAIL */

            String email =
                    claims.getSubject();

            System.out.println(
                    "Authenticated User: "
                            + email
            );

            /* CREATE AUTH OBJECT */

            UsernamePasswordAuthenticationToken authentication =

                    new UsernamePasswordAuthenticationToken(

                            email,

                            null,

                            Collections.emptyList()
                    );

            /* IMPORTANT */

            authentication.setDetails(

                    new WebAuthenticationDetailsSource()

                            .buildDetails(request)
            );

            /* SET SECURITY CONTEXT */

            SecurityContextHolder

                    .getContext()

                    .setAuthentication(
                            authentication
                    );

        } catch (Exception e) {

            response.setStatus(
                    HttpServletResponse
                            .SC_UNAUTHORIZED
            );

            response.getWriter()
                    .write("Invalid JWT Token");

            return;
        }

        filterChain.doFilter(
                request,
                response
        );
    }
}