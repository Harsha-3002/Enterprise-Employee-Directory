package com.ems.ems_backend.controller;

import com.ems.ems_backend.dto.HREmployeeDTO;
import com.ems.ems_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr")
@CrossOrigin(origins = "*")
public class HRController {

    @Autowired
    private EmployeeService employeeService;


    @GetMapping("/employees")
    @PreAuthorize("hasAuthority('ROLE_HR')")
    public ResponseEntity<List<HREmployeeDTO>> getAllEmployees() {
        try {
            List<HREmployeeDTO> employees = employeeService.getAllEmployeesForHR();
            return ResponseEntity.ok(employees);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/employees/{id}")
    @PreAuthorize("hasAuthority('ROLE_HR')")
    public ResponseEntity<HREmployeeDTO> getEmployeeById(@PathVariable Long id) {
        try {
            HREmployeeDTO employee = employeeService.getEmployeeByIdForHR(id);
            return ResponseEntity.ok(employee);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}