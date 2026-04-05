package com.ems.ems_backend.controller;

import com.ems.ems_backend.dto.SelfEmployeeDTO;
import com.ems.ems_backend.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/self")
@CrossOrigin(origins = "*")
public class SelfController {

    @Autowired
    private EmployeeService employeeService;

    /**
     * Get own employee details
     * GET /api/self/me
     * Accessible by: All authenticated users (ROLE_SELF, ROLE_HR, ROLE_OTHERS)
     */
    @GetMapping("/me")
    @PreAuthorize("hasAnyAuthority('ROLE_SELF', 'ROLE_HR', 'ROLE_OTHERS')")
    public ResponseEntity<SelfEmployeeDTO> getOwnDetails() {
        try {
            SelfEmployeeDTO employeeDTO = employeeService.getOwnDetails();
            return ResponseEntity.ok(employeeDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Update own employee details
     * PUT /api/self/me
     * Accessible by: All authenticated users (ROLE_SELF, ROLE_HR, ROLE_OTHERS)
     */
    @PutMapping("/me")
    @PreAuthorize("hasAnyAuthority('ROLE_SELF', 'ROLE_HR', 'ROLE_OTHERS')")
    public ResponseEntity<SelfEmployeeDTO> updateOwnDetails(@Valid @RequestBody SelfEmployeeDTO selfEmployeeDTO) {
        try {
            SelfEmployeeDTO updatedEmployee = employeeService.updateOwnDetails(selfEmployeeDTO);
            return ResponseEntity.ok(updatedEmployee);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}