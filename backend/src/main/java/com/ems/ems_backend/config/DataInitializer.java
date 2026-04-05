package com.ems.ems_backend.config;

import com.ems.ems_backend.entity.Employee;
import com.ems.ems_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (employeeRepository.count() > 0) {
            System.out.println("Data already exists. Skipping initialization.");
            return;
        }

//        System.out.println("Initializing sample employee data...");

        // Create HR Employee


        // Create Regular Employee 1 (ROLE_SELF)
//        Employee emp1 = new Employee(
//                "EMP020",
//                "Rambo",
//                "acrshdkxn.smith@company.com",
//                "9876543211",
//                50000.0,
//                "Engineering",
//                "romcom",
//                passwordEncoder.encode("password123"),
//                "ROLE_SELF"
//        );
//
//        // Create Regular Employee 2 (ROLE_SELF)
//        Employee emp2 = new Employee(
//                "EMP003",
//                "Bob Johnson",
//                "bob.johnson@company.com",
//                "9876543212",
//                55000.0,
//                "Marketing",
//                "bob",
//                passwordEncoder.encode("password123"),
//                "ROLE_SELF"
//        );

        // Create Employee with ROLE_OTHERS
//        Employee emp3 = new Employee(
//                "EMP004",
//                "Carol Williams",
//                "carol.williams@company.com",
//                "9876543213",
//                60000.0,
//                "Sales",
//                "carol",
//                passwordEncoder.encode("password123"),
//                "ROLE_OTHERS"
//        );

        // Create another Employee with ROLE_OTHERS
//        Employee emp4 = new Employee(
//                "EMP005",
//                "David Brown",
//                "david.brown@company.com",
//                "9876543214",
//                52000.0,
//                "Engineering",
//                "david",
//                passwordEncoder.encode("password123"),
//                "ROLE_OTHERS"
//        );

        // Save all employees
        //employeeRepository.save(hr);
//        employeeRepository.save(emp1);
//        employeeRepository.save(emp2);
//        employeeRepository.save(emp3);
//        employeeRepository.save(emp4);

//        System.out.println("✅ Sample data initialized successfully!");
//        System.out.println("\n========== TEST CREDENTIALS ==========");
//        System.out.println("HR Account:");
//        System.out.println("  Username: john_hr | Password: password123 | Role: ROLE_HR");
//        System.out.println("\nRegular Employees (ROLE_SELF):");
//        System.out.println("  Username: alice | Password: password123 | Role: ROLE_SELF");
//        System.out.println("  Username: bob | Password: password123 | Role: ROLE_SELF");
//        System.out.println("\nEmployees with ROLE_OTHERS:");
//        System.out.println("  Username: carol | Password: password123 | Role: ROLE_OTHERS");
//        System.out.println("  Username: david | Password: password123 | Role: ROLE_OTHERS");
//        System.out.println("======================================\n");
    }
}