package com.aryan.ai_assessment.security;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(

            HttpSecurity http

    ) throws Exception {

        http

                /* ENABLE CORS */

                .cors(Customizer.withDefaults())

                /* DISABLE CSRF */

                .csrf(csrf -> csrf.disable())

                /* STATELESS JWT */

                .sessionManagement(session ->

                        session.sessionCreationPolicy(

                                SessionCreationPolicy.STATELESS
                        )
                )

                /* ROUTE AUTHORIZATION */

                .authorizeHttpRequests(auth -> auth

                        /* PUBLIC ROUTES */

                        .requestMatchers(

                                "/api/auth/**",

                                "/swagger-ui/**",

                                "/swagger-ui.html",

                                "/v3/api-docs/**"

                        ).permitAll()

                        /* PROTECTED ROUTES */

                        .requestMatchers(

                                "/api/assessment/**",

                                "/api/dashboard/**"

                        ).authenticated()

                        /* EVERYTHING ELSE */

                        .anyRequest().authenticated()
                )

                /* JWT FILTER */

                .addFilterBefore(

                        jwtFilter,

                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}