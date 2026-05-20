package com.aryan.ai_assessment.assessment.repository;

import com.aryan.ai_assessment.assessment.entity.Assessment;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AssessmentRepository

        extends JpaRepository<Assessment, Long> {

}