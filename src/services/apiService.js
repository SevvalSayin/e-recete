import axios from 'axios';

const API_URL = '/api';
const API_KEY = 'Rvc6CNklg8YuyDRi014MSZennyqBH5Xib8yhWMSDJ4kk42HOnozkB0T5IVw1C9TG';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
    'Accept': 'application/json',
  },
  maxBodyLength: Infinity,
});

export const insertDocument = async (document) => {
  const data = {
    collection: 'kayıt',
    database: 'deneme',
    dataSource: 'e-recete',
    document,
  };

  try {
    const response = await axiosInstance.post('/action/insertOne', data);
    console.log('Response Status Code:', response.status);
    console.log('Parsed Result:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request error:', error.message);
    if (error.response) {
      console.error('Error Data:', error.response.data);
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    }
    if (error.message.includes('Failed to fetch')) {
      console.error('Check API URL, network connection, and CORS policy.');
    }
    throw error;
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
    const response = await axiosInstance.post('/action/find', data);
    console.log('Response Status Code:', response.status);
    console.log('Parsed Result:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request error:', error.message);
    if (error.response) {
      console.error('Error Data:', error.response.data);
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    }
    if (error.message.includes('Failed to fetch')) {
      console.error('Check API URL, network connection, and CORS policy.');
    }
    throw error;
  }
};

export const signInUser = async ({ tc, sifre }) => {
  console.log('Signing in user with TC:', tc, 'and password:', sifre);
  const result = await findDocuments({ tc, sifre });
  console.log('Find documents result:', result);
  return result;
};
