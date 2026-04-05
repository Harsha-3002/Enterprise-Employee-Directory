// src/components/Dashboard/HRDashboard.js
import React, { useState, useEffect } from 'react';
import Navbar from '../Common/Navbar';
import { getAllEmployeesForHR } from '../../services/employeeService';
import { register } from '../../services/authService';
import './Dashboard.css';

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    email: '',
    phone: '',
    salary: '',
    department: '',
    username: '',
    password: '',
    role: 'ROLE_SELF'
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getAllEmployeesForHR();
      setEmployees(data);
      setError('');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const employeeData = {
        ...formData,
        salary: parseFloat(formData.salary)
      };

      await register(employeeData);
      setSuccess('Employee added successfully!');
      
      setFormData({
        empId: '',
        name: '',
        email: '',
        phone: '',
        salary: '',
        department: '',
        username: '',
        password: '',
        role: 'ROLE_SELF'

      });

      fetchEmployees();

      setTimeout(() => {
        setShowAddModal(false);
        setSuccess('');
      }, 2000);

    } catch (err) {
      setError(err);
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Employee Management</h1>
            <p>View and manage all employees</p>
          </div>
          <button 
            className="add-employee-button"
            onClick={() => setShowAddModal(true)}
          >
            + Add New Employee
          </button>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, ID, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Employees</h3>
            <p className="stat-number">{employees.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Salary</h3>
            <p className="stat-number">
              ₹{employees.reduce((sum, emp) => sum + emp.salary, 0).toLocaleString()}
            </p>
          </div>
          <div className="stat-card">
            <h3>Departments</h3>
            <p className="stat-number">
              {new Set(employees.map(emp => emp.department)).size}
            </p>
          </div>
        </div>

        <div className="employee-table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.empId}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>
                  <td>₹{employee.salary.toLocaleString()}</td>
                  <td>{employee.username}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEmployees.length === 0 && (
            <div className="no-results">
              No employees found matching your search.
            </div>
          )}
        </div>

        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Employee</h2>
                <button 
                  className="close-button"
                  onClick={() => setShowAddModal(false)}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddEmployee} className="add-employee-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Employee ID *</label>
                    <input
                      type="text"
                      name="empId"
                      value={formData.empId}
                      onChange={handleInputChange}
                      placeholder="e.g., EMP006"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="employee@company.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Department *</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      placeholder="e.g., Engineering"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Salary *</label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="e.g., 50000"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Username *</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Login username"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Initial password"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="ROLE_SELF">Employee (Self Service)</option>
                    <option value="ROLE_HR">HR / Admin</option>
                    <option value="ROLE_OTHERS">Directory Access</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button type="submit" className="button button-primary">
                    Add Employee
                  </button>
                  <button 
                    type="button" 
                    className="button button-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HRDashboard;