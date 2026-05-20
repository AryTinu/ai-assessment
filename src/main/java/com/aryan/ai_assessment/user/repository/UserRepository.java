package com.aryan.ai_assessment.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aryan.ai_assessment.user.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}