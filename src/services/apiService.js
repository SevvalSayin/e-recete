// src/services/apiService.js
const API_URL = 'https://eu-central-1.aws.data.mongodb-api.com/app/data-nauitwn/endpoint/data/v1';
const API_KEY = 'Rvc6CNklg8YuyDRi014MSZennyqBH5Xib8yhWMSDJ4kk42HOnozkB0T5IVw1C9TG';

const fetchFromApi = async (endpoint, method = 'GET', data = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'api-key': API_KEY
  };

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message || response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Function to insert data
export const insertDocument = async (document) => {
  return fetchFromApi('action/insertOne', 'POST', {
    collection: 'kayıt',
    database: 'deneme',
    dataSource: 'e-recete',
    document
  });
};

// Function to find data
export const findDocuments = async (filter) => {
  return fetchFromApi('action/find', 'POST', {
    collection: 'kayıt',
    database: 'deneme',
    dataSource: 'e-recete',
    filter
  });
};
