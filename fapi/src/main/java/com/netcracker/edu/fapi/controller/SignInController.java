package com.netcracker.edu.fapi.controller;

import com.netcracker.edu.fapi.models.UserModel;
import com.netcracker.edu.fapi.security.JwtTokenProvider;
import com.netcracker.edu.fapi.service.SignInDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/sign/in")
public class SignInController {

    private SignInDataService signInDataService;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public SignInController(SignInDataService signInDataService,
                              AuthenticationManager authenticationManager,
                              JwtTokenProvider jwtTokenProvider,
                              BCryptPasswordEncoder passwordEncoder) {
        this.signInDataService = signInDataService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Secured({"ROLE_USER", "ROLE_ADMIN", "ROLE_ADMIN"})
    @GetMapping(value = "/{token}")
    public ResponseEntity<UserModel> getUserByToken(@PathVariable("token") String token) {
        return ResponseEntity.ok(signInDataService.getUserByToken(token));
    }

    @PostMapping
    public ResponseEntity<?> getUserByEmail(@RequestBody UserModel userModel) {
        Map<Object, Object> response = new HashMap<>();
        try {
            String username = userModel.getEmail();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, userModel.getPassword()));
            UserModel userModelEntity = signInDataService.findUserByEmail(username);

            if (userModelEntity == null) {
                response.put("error", "Incorrect email or password");
            }
            else {
                userModelEntity.setPassword(null);
                response.put("error", null);
            }
            String token = jwtTokenProvider.createToken(username, userModelEntity.getRole());

            response.put("user", userModelEntity);
            response.put("token", token);
        } catch (AuthenticationException e) {
            response.put("error", "Incorrect email or password");
        }
        return ResponseEntity.ok(response);
    }
}
