package com.aryan.ai_assessment.assessment.service;

import java.time.LocalDateTime;
import java.util.List;

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

    /* CREATE ASSESSMENT */

    public String createAssessment(
            Assessment request
    ) {

        request.setCreatedAt(
                LocalDateTime.now()
        );

        assessmentRepository.save(request);

        return "Assessment Created Successfully";
    }

    /* CREATE QUESTION */

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

        request.setAssessment(
                assessment
        );

        questionRepository.save(request);

        return "Question Added Successfully";
    }

    /* GET LEADERBOARD */

    public List<CandidateAttempt> getLeaderboard() {

        return candidateAttemptRepository
                .findAllByOrderByScoreDesc();
    }

    /* START ATTEMPT */

    public CandidateAttempt startAttempt(

            Long assessmentId,

            Long userId
    ) {

        Assessment assessment =

                assessmentRepository
                        .findById(assessmentId)
                        .orElse(null);

        if (assessment == null) {

            return null;
        }

        User user =

                userRepository
                        .findById(userId)
                        .orElse(null);

        if (user == null) {

            return null;
        }

        CandidateAttempt attempt =
                new CandidateAttempt();

        attempt.setAssessment(
                assessment
        );

        attempt.setCandidate(
                user
        );

        attempt.setScore(0);

        attempt.setSubmittedAt(
                LocalDateTime.now()
        );

        return candidateAttemptRepository
                .save(attempt);
    }

    /* SUBMIT ATTEMPT */

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

        attempt.setScore(score);

        attempt.setSubmittedAt(
                LocalDateTime.now()
        );

        candidateAttemptRepository
                .save(attempt);

        return "Attempt Submitted Successfully";
    }

    /* GET SINGLE ASSESSMENT */

    public Assessment getAssessment(
            Long id
    ) {

        return assessmentRepository
                .findById(id)
                .orElse(null);
    }

    /* GET USER ATTEMPTS */

    public List<CandidateAttempt> getUserAttempts(
            Long userId
    ) {

        return candidateAttemptRepository
                .findByCandidateId(userId);
    }

    /* GET ALL ASSESSMENTS */

    public List<Assessment> getAllAssessments() {

        return assessmentRepository.findAll();
    }
}