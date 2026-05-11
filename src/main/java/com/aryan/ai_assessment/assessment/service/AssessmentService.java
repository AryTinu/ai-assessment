package com.aryan.ai_assessment.assessment.service;

import com.aryan.ai_assessment.assessment.entity.Assessment;
import com.aryan.ai_assessment.assessment.entity.Question;

import com.aryan.ai_assessment.assessment.repository.AssessmentRepository;
import com.aryan.ai_assessment.assessment.repository.QuestionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private QuestionRepository questionRepository;

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
}