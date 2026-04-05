// src/components/Dashboard/SelfDashboard.js
import React, { useState, useEffect } from 'react';
import Navbar from '../Common/Navbar';
import { getOwnProfile, updateOwnProfile } from '../../services/employeeService';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const SelfDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getOwnProfile();
      setProfile(data);
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        department: data.department,
      });
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
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      department: profile.department,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateOwnProfile(formData);
      setProfile(updatedProfile);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setError('');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err);
      setSuccess('');
    }
  };

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
          <h1>My Profile</h1>
          <p>View and edit your personal information</p>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <div className="profile-card">
          {!isEditing ? (
            <>
              <div className="profile-info">
                <div className="info-row">
                  <span className="info-label">Employee ID:</span>
                  <span className="info-value">{profile.empId}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Username:</span>
                  <span className="info-value">{profile.username}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{profile.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{profile.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{profile.phone}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Department:</span>
                  <span className="info-value">{profile.department}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Salary:</span>
                  <span className="info-value">₹{profile.salary?.toLocaleString()}</span>
                </div>
              </div>
              
              <button className="button button-primary" onClick={handleEdit}>
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Department:</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="button button-primary">
                  Save Changes
                </button>
                <button 
                  type="button" 
                  className="button button-secondary" 
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default SelfDashboard;