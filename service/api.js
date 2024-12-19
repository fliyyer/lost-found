import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

const token = localStorage.getItem('auth');

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Something went wrong');
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/users/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Something went wrong');
  }
};

export const getUserById = async (userId) => {
  const response = await axios.get(`${baseURL}/users/${userId}`);
  return response.data;
};

export const getAllItems = async (filters = {}) => {
  try {
      const params = new URLSearchParams(filters).toString(); 
      const response = await axios.get(`${baseURL}/items/search?${params}`);
      return response.data.items; 
  } catch (error) {
      throw error.response ? error.response.data : new Error('Something went wrong');
  }
};

export const getItemDetails = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/items/details/${id}`); 
    return response.data.item;  
  } catch (error) {
    throw error.response ? error.response.data : new Error('Something went wrong');
  }
};

export const uploadItem = async (itemData) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${baseURL}/items/upload`, itemData, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Something went wrong');
  }
};

export const claimItem = async (itemId) => {
  try {
    const decoded = jwtDecode(token); 
    const userId = decoded.id; 
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.put(`${baseURL}/items/${itemId}/claim`, { userId }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in claimItem:", error); 
    throw error.response ? error.response.data : new Error('Something went wrong');
  }
};

export const acceptItem = async (itemId) => {
  try {
    const token = localStorage.getItem('auth');
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.put(`${baseURL}/items/${itemId}/accept`, {}, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Something went wrong');
  }
};






