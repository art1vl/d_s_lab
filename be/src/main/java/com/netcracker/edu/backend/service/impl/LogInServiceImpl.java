package com.netcracker.edu.backend.service.impl;

import com.netcracker.edu.backend.entity.LogInEntity;
import com.netcracker.edu.backend.repository.LogInRepository;
import com.netcracker.edu.backend.service.LogInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogInServiceImpl implements LogInService {
    @Autowired
    private LogInRepository logInRepository;

    @Override
    public LogInEntity findUserByEmail(String email) {
        return logInRepository.findByEmail(email);
    }

    @Override
    public LogInEntity saveUser(LogInEntity user) {
        return logInRepository.save(user);
    }
}
