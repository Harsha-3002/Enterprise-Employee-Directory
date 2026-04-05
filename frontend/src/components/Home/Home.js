import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Employee Management System</h1>
        <p className="home-subtitle">Choose your login type to continue</p>
        
        <div className="login-options">
          <div className="login-card" onClick={() => navigate('/self-login')}>
            <div className="card-icon">👤</div>
            <h2>Self Service</h2>
            <p>View and update your personal profile</p>
            <ul>
              <li>View your details</li>
              <li>Update contact info</li>
              <li>Edit profile</li>
            </ul>
            <button className="card-button">Login as Employee</button>
          </div>

          <div className="login-card admin-card" onClick={() => navigate('/admin-login')}>
            <div className="card-icon">👨‍💼</div>
            <h2>HR / Admin</h2>
            <p>Manage all employees and their information</p>
            <ul>
              <li>View all employees</li>
              <li>Access salary details</li>
              <li>Manage departments</li>
            </ul>
            <button className="card-button admin-button">Login as HR</button>
          </div>

          <div className="login-card directory-card" onClick={() => navigate('/directory-login')}>
            <div className="card-icon">📋</div>
            <h2>Employee Directory</h2>
            <p>View contact details of other employees</p>
            <ul>
              <li>Search employees</li>
              <li>View contact info</li>
              <li>Connect with team</li>
            </ul>
            <button className="card-button directory-button">Access Directory</button>
          </div>
        </div>

        <div className="home-footer">
          <p>© 2026 Employee Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;