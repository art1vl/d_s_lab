package com.netcracker.edu.backend.controller;

import com.netcracker.edu.backend.entity.LogInEntity;
import com.netcracker.edu.backend.service.LogInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/sign/in")
public class SignInController {
    private LogInService logInService;

    @Autowired
    public SignInController(LogInService logInService) {
        this.logInService = logInService;
    }

    @GetMapping(value = "/{email}")
    public ResponseEntity<LogInEntity> getLogInEntity(@PathVariable("email") String email) {
        return ResponseEntity.ok(logInService.findUserByEmail(email));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<LogInEntity> saveUser(@RequestBody LogInEntity user) {
        return ResponseEntity.ok(logInService.saveUser(user));
    }
}
