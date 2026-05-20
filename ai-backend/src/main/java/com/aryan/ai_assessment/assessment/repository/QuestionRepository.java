package com.aryan.ai_assessment.assessment.repository;

import com.aryan.ai_assessment.assessment.entity.Question;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository
        extends JpaRepository<Question, Long> {

}