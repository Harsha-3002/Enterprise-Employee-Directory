package com.ems.ems_backend.dto;

/**
 * DTO for OTHERS login - Employees can view limited info of other employees
 * Contains only: empId, name, phone, email (NO salary, NO department)
 */
public class OthersEmployeeDTO {

    private String empId;
    private String name;
    private String email;
    private String phone;

    // Constructors
    public OthersEmployeeDTO() {
    }

    public OthersEmployeeDTO(String empId, String name, String email, String phone) {
        this.empId = empId;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    // Getters and Setters
    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}