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

                /* AUTHORIZATION */

                // .authorizeHttpRequests(auth -> auth
                //
                //         .requestMatchers(
                //
                //                 "/api/auth/**",
                //
                //                 "/swagger-ui/**",
                //
                //                 "/v3/api-docs/**"
                //
                //         ).permitAll()
                //
                //         .anyRequest().authenticated()
                // )

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(

                                "/api/auth/**",

                                "/swagger-ui/**",

                                "/v3/api-docs/**"

                        ).permitAll()

                        /* ASSESSMENT + DASHBOARD REQUIRE JWT */

                        .requestMatchers(

                                "/api/assessment/**",

                                "/api/dashboard/**"

                        ).authenticated()

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