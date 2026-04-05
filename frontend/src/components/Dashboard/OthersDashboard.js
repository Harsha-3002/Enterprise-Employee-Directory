// src/components/Dashboard/OthersDashboard.js
import React, { useState, useEffect } from 'react';
import Navbar from '../Common/Navbar';
import { getAllEmployeesForDirectory } from '../../services/employeeService';
import './Dashboard.css';

const OthersDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getAllEmployeesForDirectory();
      setEmployees(data);
      setError('');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1>Employee Directory</h1>
          <p>View contact information of other employees</p>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="employee-grid">
          {filteredEmployees.map((employee) => (
            <div key={employee.empId} className="employee-card">
              <div className="employee-avatar">
                {employee.name.charAt(0).toUpperCase()}
              </div>
              <div className="employee-details">
                <h3>{employee.name}</h3>
                <p className="employee-id">{employee.empId}</p>
                <div className="contact-info">
                  <p>📧 {employee.email}</p>
                  <p>📱 {employee.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="no-results">
            No employees found matching your search.
          </div>
        )}
      </div>
    </>
  );
};

export default OthersDashboard;