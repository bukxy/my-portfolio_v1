package com.peron_nicolas.portfolio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class MainController {

    @GetMapping("/welcome")
    public String allAccess() {
        return "Welcome to my portfolio API.";
    }

    @GetMapping("/user")
    public String userAccess() {
        return "User content with JWT";
    }

    @GetMapping("/special")
    public String speciallAccess() {
        return "Special content with JWT";
    }

}
