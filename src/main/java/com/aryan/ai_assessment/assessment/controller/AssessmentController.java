package com.aryan.ai_assessment.assessment.controller;

import com.aryan.ai_assessment.assessment.entity.Assessment;
import com.aryan.ai_assessment.assessment.entity.Question;
import com.aryan.ai_assessment.assessment.entity.CandidateAttempt;

import com.aryan.ai_assessment.assessment.service.AssessmentService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin("*")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    /* GET SINGLE ASSESSMENT */

    @GetMapping("/{id}")
    public Assessment getAssessment(
            @PathVariable Long id
    ) {

        return assessmentService.getAssessment(id);
    }

    /* GET ALL ASSESSMENTS */

    @GetMapping("/all")
    public List<Assessment> getAllAssessments() {

        return assessmentService.getAllAssessments();
    }

    /* GET RECENT ATTEMPTS */

    @GetMapping("/recent")
    public List<CandidateAttempt> getRecentAttempts() {

        return assessmentService.getLeaderboard();
    }

    /* LEADERBOARD */

    @GetMapping("/leaderboard")
    public List<CandidateAttempt> getLeaderboard() {

        return assessmentService.getLeaderboard();
    }

    /* CREATE ASSESSMENT */

    @PostMapping("/create")
    public String createAssessment(

            @RequestBody Assessment request
    ) {

        return assessmentService
                .createAssessment(request);
    }

    /* ADD QUESTION */

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

    /* START ATTEMPT */

    @PostMapping("/attempt/start/{assessmentId}/{userId}")
    public CandidateAttempt startAttempt(

            @PathVariable Long assessmentId,

            @PathVariable Long userId
    ) {

        return assessmentService.startAttempt(

                assessmentId,

                userId
        );
    }

    /* SUBMIT ATTEMPT */

    @PostMapping("/attempt/submit/{attemptId}/{score}")
    public String submitAttempt(

            @PathVariable Long attemptId,

            @PathVariable Integer score
    ) {

        return assessmentService.submitAttempt(

                attemptId,

                score
        );
    }

    /* USER RESULTS */

    @GetMapping("/result/{userId}")
    public List<CandidateAttempt> getUserResults(

            @PathVariable Long userId
    ) {

        return assessmentService.getUserAttempts(
                userId
        );
    }
}