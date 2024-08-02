<<<<<<< HEAD
import axiosInstance from './axiosInstance';
=======
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
    'Accept': 'application/json',
  },
  maxBodyLength: Infinity,
});
>>>>>>> be457a79f067c8c0178a37c7ac2f1be52dd295c8

export const insertDocument = async (document) => {
  const data = {
    collection: 'kayıt',
    database: 'deneme',
    dataSource: 'e-recete',
    document,
  };

  try {
    console.log('Request URL:', '/action/insertOne');
    console.log('Request Data:', data);
    const response = await axiosInstance.post('/action/insertOne', data);
    console.log('Response Status Code:', response.status);
    console.log('Parsed Result:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request error:', error.message);
    if (error.response) {
      console.error('Error Data:', error.response.data);
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from the server. Check your network connection or CORS policy.');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up the request.');
    }
  }
};

export const findDocuments = async (filter = {}) => {
  const data = {
    collection: 'kayıt',
    database: 'deneme',
    dataSource: 'e-recete',
    filter,
  };

  try {
    console.log('Request URL:', '/action/find');
    console.log('Request Data:', data);
    const response = await axiosInstance.post('/action/find', data);
    console.log('Response Status Code:', response.status);
    console.log('Parsed Result:', response.data);
    return response.data.documents;
  } catch (error) {
    console.error('API request error:', error.message);
    if (error.response) {
      console.error('Error Data:', error.response.data);
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from the server.');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up the request.');
    }
  }
};

export const signUpUser = async ({ tc, password, name, surname }) => {
  const existingUsers = await findDocuments({ tc });

  if (existingUsers.length > 0) {
    /* alert('Üzgünüz, bu TC numarası ile kayıtlı bir kullanıcı bulunmaktadır'); */
    throw new Error('Üzgünüz, bu TC numarası ile kayıtlı bir kullanıcı bulunmaktadır');
  }

  const document = { tc, password, name, surname };
  console.log('Signing up user with TC:', tc, 'and password:', password, 'name:', name, 'surname:', surname);
  return await insertDocument(document); 
};

export const signInUser = async ({ tc, sifre }) => {
  console.log('Signing in user with TC:', tc, 'and password:', sifre);
  const result = await findDocuments({ tc, password: sifre });
  console.log('Find documents result:', result);
  return result;
};
