// src/services/employeeService.js
import api from './api';

// SELF - Get own details
export const getOwnProfile = async () => {
  try {
    const response = await api.get('/self/me');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch profile';
  }
};

// SELF - Update own details
export const updateOwnProfile = async (profileData) => {
  try {
    const response = await api.put('/self/me', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update profile';
  }
};

// HR - Get all employees
export const getAllEmployeesForHR = async () => {
  try {
    const response = await api.get('/hr/employees');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch employees';
  }
};

// HR - Get single employee by ID
export const getEmployeeByIdForHR = async (id) => {
  try {
    const response = await api.get(`/hr/employees/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch employee';
  }
};

// DIRECTORY - Get all employees (limited info)
export const getAllEmployeesForDirectory = async () => {
  try {
    const response = await api.get('/directory/employees');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch employees';
  }
};

// DIRECTORY - Get single employee by ID (limited info)
export const getEmployeeByIdForDirectory = async (id) => {
  try {
    const response = await api.get(`/directory/employees/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch employee';
  }
};