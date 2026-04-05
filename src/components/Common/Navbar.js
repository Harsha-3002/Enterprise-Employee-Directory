// src/components/Common/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDashboard = () => {
    if (user.role === 'ROLE_HR') {
      navigate('/hr-dashboard');
    } else if (user.role === 'ROLE_OTHERS') {
      navigate('/directory-dashboard');
    } else {
      navigate('/self-dashboard');
    }
  };

  const handleDirectory = () => {
    navigate('/directory-dashboard');
  };

  const getRoleName = (role) => {
    switch (role) {
      case 'ROLE_HR':
        return 'HR Manager';
      case 'ROLE_OTHERS':
        return 'Employee';
      case 'ROLE_SELF':
        return 'Employee';
      default:
        return 'User';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={handleDashboard}>
          <h2>EMS</h2>
        </div>
        
        <div className="navbar-menu">
          <button className="nav-link" onClick={handleDashboard}>
            Dashboard
          </button>
          
          <button className="nav-link" onClick={handleDirectory}>
            Directory
          </button>
          
          <div className="navbar-user">
            <span className="user-info">
              {user.username} ({getRoleName(user.role)})
            </span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;