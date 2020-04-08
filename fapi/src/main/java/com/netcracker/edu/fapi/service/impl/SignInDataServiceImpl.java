package com.netcracker.edu.fapi.service.impl;

import com.netcracker.edu.fapi.models.UserModel;
import com.netcracker.edu.fapi.service.SignInDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashSet;
import java.util.Set;

@Service("logInIndService")
public class SignInDataServiceImpl implements SignInDataService, UserDetailsService {
    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserModel userModel = findUserByEmail(email);
        if (userModel == null) {
            throw new UsernameNotFoundException("User with email: " + email + " not found");
        }
        return new org.springframework.security.core.userdetails.User(userModel.getEmail(), userModel.getPassword(), getAuthority());
    }

    private Set<SimpleGrantedAuthority> getAuthority() {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }

    @Override
    public UserModel findUserByEmail(String email) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/sign/in/" + email, UserModel.class);
    }

    @Override
    public UserModel getUserByToken(String token) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) usernamePasswordAuthenticationToken.getPrincipal();
        String email = userDetails.getUsername();
        return findUserByEmail(email);
    }
}
