import axios from 'axios';

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
    const response = await axios.get(`${baseURL}/items/${id}`);
    return response.data.items;  
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

