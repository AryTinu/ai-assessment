package com.aryan.ai_assessment.assessment.entity;

import com.aryan.ai_assessment.user.entity.User;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "candidate_attempts")
public class CandidateAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer score;

    private LocalDateTime submittedAt;

    // Many attempts belong to one candidate
    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private User candidate;

    // Many attempts belong to one assessment
    @ManyToOne
    @JoinColumn(name = "assessment_id")
    private Assessment assessment;

    // Default Constructor
    public CandidateAttempt() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public User getCandidate() {
        return candidate;
    }

    public void setCandidate(User candidate) {
        this.candidate = candidate;
    }

    public Assessment getAssessment() {
        return assessment;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }
}