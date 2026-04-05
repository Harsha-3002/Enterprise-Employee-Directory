// src/components/Auth/DirectoryLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import './LoginPages.css';

const DirectoryLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(username, password);
      
      // Check if user is authenticated (any role is allowed)
      if (!response.role) {
        setError('Login failed. Please try again.');
        setLoading(false);
        return;
      }

      authLogin({
        username: response.username,
        role: response.role,
        empId: response.empId,
      });

      navigate('/directory-dashboard');
    } catch (err) {
      setError(err || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container directory-bg">
      <div className="login-page-box">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        
        <div className="login-page-icon directory-icon">📋</div>
        <h1>Employee Directory</h1>
        <p className="login-page-subtitle">Access employee contact information</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-page-button directory-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Access Directory'}
          </button>
        </form>

        <div className="test-credentials">
          <p><strong>Test Accounts (Any employee can access):</strong></p>
          <p>alice / password123 (Employee)</p>
          <p>carol / password123 (Directory Access)</p>
          <p>john_hr / password123 (HR)</p>
        </div>
      </div>
    </div>
  );
};

export default DirectoryLogin;