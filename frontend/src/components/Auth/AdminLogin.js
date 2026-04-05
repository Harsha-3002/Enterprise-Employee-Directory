import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import './LoginPages.css';

const AdminLogin = () => {
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
      
      if (response.role !== 'ROLE_HR') {
        setError('Access Denied. Only HR/Admin can login here.');
        setLoading(false);
        return;
      }

      authLogin({
        username: response.username,
        role: response.role,
        empId: response.empId,
      });

      navigate('/hr-dashboard');
    } catch (err) {
      setError(err || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container admin-bg">
      <div className="login-page-box">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        
        <div className="login-page-icon admin-icon">👨‍💼</div>
        <h1>HR / Admin Login</h1>
        <p className="login-page-subtitle">Manage employee information</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
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
              placeholder="Enter admin password"
              required
            />
          </div>

          <button type="submit" className="login-page-button admin-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <div className="test-credentials">
          <p><strong>Test Account:</strong> john_hr / password123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;