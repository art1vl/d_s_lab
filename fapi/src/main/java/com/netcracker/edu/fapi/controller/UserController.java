package com.netcracker.edu.fapi.controller;

import com.netcracker.edu.fapi.models.UserModel;
import com.netcracker.edu.fapi.service.SignInDataService;
import com.netcracker.edu.fapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SignInDataService signInDataService;

    @PostMapping(value = "/register")
    public ResponseEntity<UserModel> saveUser(@RequestBody UserModel user) {
        return ResponseEntity.ok(userService.register(user));
    }

    @Secured("ROLE_USER")
    @GetMapping(value = "/info/{email}")
    public ResponseEntity<UserModel> getUserInfo(@PathVariable("email") String email) {
        return ResponseEntity.ok(signInDataService.findUserByEmail(email));
    }
}
