package com.aryan.ai_assessment.assessment.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/assessment")
    public String testApi() {

        return "Protected API Accessed";
    }
}