package com.aryan.ai_assessment.assessment.service;

import java.util.List;
import java.time.LocalDateTime;

import com.aryan.ai_assessment.assessment.entity.Assessment;
import com.aryan.ai_assessment.assessment.entity.Question;
import com.aryan.ai_assessment.assessment.entity.CandidateAttempt;

import com.aryan.ai_assessment.assessment.repository.AssessmentRepository;
import com.aryan.ai_assessment.assessment.repository.QuestionRepository;
import com.aryan.ai_assessment.assessment.repository.CandidateAttemptRepository;

import com.aryan.ai_assessment.user.entity.User;
import com.aryan.ai_assessment.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private CandidateAttemptRepository candidateAttemptRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE ASSESSMENT
    public String createAssessment(
            Assessment request
    ) {

        request.setCreatedAt(
                LocalDateTime.now()
        );

        assessmentRepository.save(request);

        return "Assessment Created Successfully";
    }

    // CREATE QUESTION
    public String createQuestion(
            Question request,
            Long assessmentId
    ) {

        Assessment assessment =
                assessmentRepository
                        .findById(assessmentId)
                        .orElse(null);

        if (assessment == null) {

            return "Assessment Not Found";
        }

        // Attach assessment to question
        request.setAssessment(assessment);

        // Save question
        questionRepository.save(request);

        return "Question Added Successfully";
    }

    // LEADERBOARD
    public List<CandidateAttempt> getLeaderboard() {

        return candidateAttemptRepository
                .findAllByOrderByScoreDesc();
    }

    // START ATTEMPT
    public String startAttempt(

            Long assessmentId,

            Long userId
    ) {

        // Find assessment
        Assessment assessment =
                assessmentRepository
                        .findById(assessmentId)
                        .orElse(null);

        if (assessment == null) {

            return "Assessment Not Found";
        }

        // Find user
        User user =
                userRepository
                        .findById(userId)
                        .orElse(null);

        if (user == null) {

            return "User Not Found";
        }

        // Create attempt
        CandidateAttempt attempt =
                new CandidateAttempt();

        // Link assessment
        attempt.setAssessment(assessment);

        // Link candidate
        attempt.setCandidate(user);

        // Save attempt
        candidateAttemptRepository.save(attempt);

        return "Attempt Started Successfully";
    }

    // SUBMIT ATTEMPT
    public String submitAttempt(

            Long attemptId,

            Integer score
    ) {

        CandidateAttempt attempt =
                candidateAttemptRepository
                        .findById(attemptId)
                        .orElse(null);

        if (attempt == null) {

            return "Attempt Not Found";
        }

        // Set score
        attempt.setScore(score);

        // Set submission time
        attempt.setSubmittedAt(
                LocalDateTime.now()
        );

        // Save updated attempt
        candidateAttemptRepository.save(attempt);

        return "Attempt Submitted Successfully";
    }

    // GET ASSESSMENT
    public Assessment getAssessment(
            Long id
    ) {

        return assessmentRepository
                .findById(id)
                .orElse(null);
    }

    // RESULT API
    public List<CandidateAttempt> getUserAttempts(
            Long userId
    ) {

        return candidateAttemptRepository
                .findByCandidateId(userId);
    }
    public List<Assessment> getAllAssessments() {

    return assessmentRepository.findAll();
}
}