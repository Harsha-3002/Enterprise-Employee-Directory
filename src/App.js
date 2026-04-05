// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home/Home';
import SelfLogin from './components/Auth/SelfLogin';
import AdminLogin from './components/Auth/AdminLogin';
import DirectoryLogin from './components/Auth/DirectoryLogin';
import PrivateRoute from './components/Common/PrivateRoute';
import SelfDashboard from './components/Dashboard/SelfDashboard';
import HRDashboard from './components/Dashboard/HRDashboard';
import OthersDashboard from './components/Dashboard/OthersDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/self-login" element={<SelfLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/directory-login" element={<DirectoryLogin />} />
            
            {/* Protected Routes */}
            <Route 
              path="/self-dashboard" 
              element={
                <PrivateRoute allowedRoles={['ROLE_SELF', 'ROLE_HR', 'ROLE_OTHERS']}>
                  <SelfDashboard />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/hr-dashboard" 
              element={
                <PrivateRoute allowedRoles={['ROLE_HR']}>
                  <HRDashboard />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/directory-dashboard" 
              element={
                <PrivateRoute allowedRoles={['ROLE_SELF', 'ROLE_HR', 'ROLE_OTHERS']}>
                  <OthersDashboard />
                </PrivateRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;