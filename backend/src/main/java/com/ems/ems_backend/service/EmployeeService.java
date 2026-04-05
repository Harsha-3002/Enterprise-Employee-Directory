package com.ems.ems_backend.service;

import com.ems.ems_backend.dto.HREmployeeDTO;
import com.ems.ems_backend.dto.OthersEmployeeDTO;
import com.ems.ems_backend.dto.SelfEmployeeDTO;
import com.ems.ems_backend.entity.Employee;
import com.ems.ems_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    /**
     * Get currently logged-in username from SecurityContext
     */
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    /**
     * SELF LOGIN: Get own employee details
     */
    public SelfEmployeeDTO getOwnDetails() {
        String username = getCurrentUsername();
        Employee employee = employeeRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return mapToSelfDTO(employee);
    }


    /**
     * SELF LOGIN: Update own employee details
     */
    public SelfEmployeeDTO updateOwnDetails(SelfEmployeeDTO selfEmployeeDTO) {
        String username = getCurrentUsername();
        Employee employee = employeeRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Update only allowed fields
        employee.setName(selfEmployeeDTO.getName());
        employee.setEmail(selfEmployeeDTO.getEmail());
        employee.setPhone(selfEmployeeDTO.getPhone());
        employee.setDepartment(selfEmployeeDTO.getDepartment());

        Employee updatedEmployee = employeeRepository.save(employee);
        return mapToSelfDTO(updatedEmployee);
    }

    /**
     * HR LOGIN: Get all employees with full details
     */
    public List<HREmployeeDTO> getAllEmployeesForHR() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(this::mapToHRDTO)
                .collect(Collectors.toList());
    }

    /**
     * HR LOGIN: Get single employee details
     */
    public HREmployeeDTO getEmployeeByIdForHR(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return mapToHRDTO(employee);
    }

    /**
     * OTHERS LOGIN: Get all employees with limited details
     */
    public List<OthersEmployeeDTO> getAllEmployeesForOthers() {
        String currentUsername = getCurrentUsername();
        List<Employee> employees = employeeRepository.findAll();

        // Exclude the current logged-in user from the list
        return employees.stream()
                .filter(emp -> !emp.getUsername().equals(currentUsername))
                .map(this::mapToOthersDTO)
                .collect(Collectors.toList());
    }

    /**
     * OTHERS LOGIN: Get single employee with limited details
     */
    public OthersEmployeeDTO getEmployeeByIdForOthers(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Prevent viewing own details through this endpoint
        if (employee.getUsername().equals(getCurrentUsername())) {
            throw new RuntimeException("Use self endpoint to view your own details");
        }

        return mapToOthersDTO(employee);
    }

    // ===== Mapping Methods =====

    private SelfEmployeeDTO mapToSelfDTO(Employee employee) {
        return new SelfEmployeeDTO(
                employee.getId(),
                employee.getEmpId(),
                employee.getUsername(),
                employee.getName(),
                employee.getEmail(),
                employee.getPhone(),
                employee.getSalary(),
                employee.getDepartment()
        );
    }

    private HREmployeeDTO mapToHRDTO(Employee employee) {
        return new HREmployeeDTO(
                employee.getId(),
                employee.getEmpId(),
                employee.getName(),
                employee.getEmail(),
                employee.getPhone(),
                employee.getSalary(),
                employee.getDepartment(),
                employee.getUsername()
        );
    }

    private OthersEmployeeDTO mapToOthersDTO(Employee employee) {
        return new OthersEmployeeDTO(
                employee.getEmpId(),
                employee.getName(),
                employee.getEmail(),
                employee.getPhone()
        );
    }
}