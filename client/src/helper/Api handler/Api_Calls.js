// This file contains the API calls for the application.
import axios from 'axios';
const SERVER_URI = import.meta.env.VITE_SERVER_URI;


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${SERVER_URI}/user/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${SERVER_URI}/user/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

export const getUser = async () => {
  try {
    const response = await axios.get(`${SERVER_URI}/user/getUser`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export const getUserById = async (userId) => {
  try {
    const response = await axios.post(`${SERVER_URI}/user/getUserById`, { userId });
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}


