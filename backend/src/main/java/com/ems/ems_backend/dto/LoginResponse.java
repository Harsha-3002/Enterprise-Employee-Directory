package com.ems.ems_backend.dto;

public class LoginResponse {

    private String token;
    private String username;
    private String role;
    private String empId;
    private String message;

    // Constructors
    public LoginResponse() {
    }

    public LoginResponse(String token, String username, String role, String empId, String message) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.empId = empId;
        this.message = message;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}