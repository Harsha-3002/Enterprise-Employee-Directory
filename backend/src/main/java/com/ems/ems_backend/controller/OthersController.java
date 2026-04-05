// src/components/Dashboard/OthersController.java
package com.ems.ems_backend.controller;

import com.ems.ems_backend.dto.OthersEmployeeDTO;
import com.ems.ems_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/directory")
@CrossOrigin(origins = "*")
public class OthersController {

    @Autowired
    private EmployeeService employeeService;

    /**
     * Get all employees with limited details (empId, name, phone, email only)
     * GET /api/directory/employees
     * Accessible by: ALL authenticated users (any role)
     */
    @GetMapping("/employees")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<OthersEmployeeDTO>> getAllEmployees() {
        try {
            List<OthersEmployeeDTO> employees = employeeService.getAllEmployeesForOthers();
            return ResponseEntity.ok(employees);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get single employee details by ID (limited info)
     * GET /api/directory/employees/{id}
     * Accessible by: ALL authenticated users (any role)
     */
    @GetMapping("/employees/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<OthersEmployeeDTO> getEmployeeById(@PathVariable Long id) {
        try {
            OthersEmployeeDTO employee = employeeService.getEmployeeByIdForOthers(id);
            return ResponseEntity.ok(employee);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}