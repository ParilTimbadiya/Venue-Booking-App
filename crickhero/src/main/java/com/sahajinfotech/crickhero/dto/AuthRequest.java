package com.sahajinfotech.crickhero.dto;

import jakarta.persistence.Column;

public class AuthRequest {
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    public String getEmail() {
        return email;
    }

    public AuthRequest setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public AuthRequest setPassword(String password) {
        this.password = password;
        return this;
    }
}
