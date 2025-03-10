package com.cricboard.dto;

import org.springframework.http.HttpStatus;

public class AuthResponse {
    private String message;
    private HttpStatus httpStatus;
    private String role;

    public String getRole() {
        return role;
    }

    public AuthResponse setRole(String role) {
        this.role = role;
        return this;
    }

    public AuthResponse(String message, HttpStatus httpStatus, String role) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.role = role;
    }

    public AuthResponse(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public AuthResponse() {
    }

    public String getMessage() {
        return message;
    }

    public AuthResponse setMessage(String message) {
        this.message = message;
        return this;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public AuthResponse setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
        return this;
    }
}