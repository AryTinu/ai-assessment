package com.aryan.ai_assessment.assessment.entity;

import com.aryan.ai_assessment.user.entity.User;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    // MANY ATTEMPTS BELONG TO ONE USER

    @ManyToOne
    @JoinColumn(name = "candidate_id")

    @JsonIgnoreProperties({
            "password"
    })

    private User candidate;

    // MANY ATTEMPTS BELONG TO ONE ASSESSMENT

    @ManyToOne
    @JoinColumn(name = "assessment_id")

    @JsonIgnoreProperties({
            "questions"
    })

    private Assessment assessment;

    // DEFAULT CONSTRUCTOR

    public CandidateAttempt() {
    }

    // GETTERS AND SETTERS

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

    public void setSubmittedAt(
            LocalDateTime submittedAt
    ) {
        this.submittedAt = submittedAt;
    }

    public User getCandidate() {
        return candidate;
    }

    public void setCandidate(
            User candidate
    ) {
        this.candidate = candidate;
    }

    public Assessment getAssessment() {
        return assessment;
    }

    public void setAssessment(
            Assessment assessment
    ) {
        this.assessment = assessment;
    }
}