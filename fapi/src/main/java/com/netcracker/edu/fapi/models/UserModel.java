package com.netcracker.edu.fapi.models;

import lombok.Data;

@Data
public class UserModel {
    private String email;
    private String password;
    private String role;
}