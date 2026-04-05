package com.ems.ems_backend.dto;

/**
 * DTO for HR login - HR can view all employee details including salary
 * This is read-only for HR (they can view but typically don't edit via this view)
 */
public class HREmployeeDTO {

    private Long id;
    private String empId;
    private String name;
    private String email;
    private String phone;
    private Double salary; // HR can view salary
    private String department;
    private String username;

    // Constructors
    public HREmployeeDTO() {
    }

    public HREmployeeDTO(Long id, String empId, String name, String email,
                         String phone, Double salary, String department, String username) {
        this.id = id;
        this.empId = empId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.salary = salary;
        this.department = department;
        this.username = username;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}