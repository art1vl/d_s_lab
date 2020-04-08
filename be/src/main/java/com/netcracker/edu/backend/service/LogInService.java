package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entity.LogInEntity;

public interface LogInService {
    LogInEntity findUserByEmail(String email);

    LogInEntity saveUser(LogInEntity user);
}
