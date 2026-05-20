package com.aryan.ai_assessment.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DashboardController {

    @GetMapping("/api/dashboard/stats")
    public Map<String, Object> getStats() {

        return Map.of(

                "totalAssessments", 12,

                "totalAttempts", 18,

                "averageScore", 74,

                "rank", 21
        );
    }
}