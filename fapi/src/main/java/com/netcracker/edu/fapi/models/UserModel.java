package com.netcracker.edu.fapi.models;

import lombok.Data;

@Data
public class UserModel {
    private String email;
    private String password;
    private String role;

    public UserModel() {
    }

    public UserModel(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}