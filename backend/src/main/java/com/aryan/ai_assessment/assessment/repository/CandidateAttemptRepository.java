package com.aryan.ai_assessment.assessment.repository;

import com.aryan.ai_assessment.assessment.entity.CandidateAttempt;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;



public interface CandidateAttemptRepository
        extends JpaRepository<CandidateAttempt, Long> {

    List<CandidateAttempt> findAllByOrderByScoreDesc();
    List<CandidateAttempt> findByCandidateId(Long candidateId);
}