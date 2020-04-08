package com.netcracker.edu.fapi.service;


import com.netcracker.edu.fapi.models.UserModel;
import org.springframework.security.core.userdetails.UserDetails;

public interface SignInDataService {
    UserModel findUserByEmail(String email);

    UserDetails loadUserByUsername(String email);

    UserModel getUserByToken(String token);
}
