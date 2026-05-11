package com.aryan.ai_assessment.assessment.controller;

import com.aryan.ai_assessment.assessment.entity.Assessment;
import com.aryan.ai_assessment.assessment.entity.Question;
import com.aryan.ai_assessment.assessment.service.AssessmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assessment")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping("/create")
    public String createAssessment(
            @RequestBody Assessment request
    ) {

        return assessmentService
                .createAssessment(request);
    }
    @PostMapping("/question/add/{assessmentId}")
public String addQuestion(
        @RequestBody Question request,
        @PathVariable Long assessmentId
) {

    return assessmentService.createQuestion(
            request,
            assessmentId
    );
}
}