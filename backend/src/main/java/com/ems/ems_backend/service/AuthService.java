package com.ems.ems_backend.service;

import com.ems.ems_backend.dto.LoginRequest;
import com.ems.ems_backend.dto.LoginResponse;
import com.ems.ems_backend.dto.RegisterRequest;
import com.ems.ems_backend.entity.Employee;
import com.ems.ems_backend.repository.EmployeeRepository;
import com.ems.ems_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Authenticate user and generate JWT token
     */
    public LoginResponse login(LoginRequest loginRequest) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            // Get employee details
            Employee employee = employeeRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

            // Generate JWT token
            String token = jwtUtil.generateToken(employee.getUsername(), employee.getRole());

            // Return login response
            return new LoginResponse(
                    token,
                    employee.getUsername(),
                    employee.getRole(),
                    employee.getEmpId(),
                    "Login successful"
            );

        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid username or password");
        }
    }

    /**
     * Register a new employee
     */
    public Employee register(RegisterRequest registerRequest) {
        // Check if username already exists
        if (employeeRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Create new employee
        Employee employee = new Employee("EMP020", "Alice Smith", "alice.smith@company.com", "9876543211", 50000.0, "Engineering", "alice", passwordEncoder.encode("password123"), "ROLE_SELF");
        employee.setEmpId(registerRequest.getEmpId());
        employee.setName(registerRequest.getName());
        employee.setEmail(registerRequest.getEmail());
        employee.setPhone(registerRequest.getPhone());
        employee.setSalary(registerRequest.getSalary());
        employee.setDepartment(registerRequest.getDepartment());
        employee.setUsername(registerRequest.getUsername());
        employee.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        employee.setRole(registerRequest.getRole());

        // Save and return employee
        return employeeRepository.save(employee);
    }
}