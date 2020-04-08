package com.netcracker.edu.fapi.service.impl;

import com.netcracker.edu.fapi.models.UserModel;
import com.netcracker.edu.fapi.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserServiceImpl implements UserService {
    @Value("${backend.server.url}")
    private String backendServerUrl;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserModel register(UserModel user) {
        RestTemplate restTemplate = new RestTemplate();
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        return restTemplate.postForEntity(backendServerUrl + "/api/sign/in/register", user, UserModel.class).getBody();
    }
}
