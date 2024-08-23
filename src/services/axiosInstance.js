import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',  // Route through Vite proxy
  headers: {
    'Content-Type': 'application/json',
    'api-key': import.meta.env.VITE_API_KEY || 'Rvc6CNklg8YuyDRi014MSZennyqBH5Xib8yhWMSDJ4kk42HOnozkB0T5IVw1C9TG',
    'Accept': 'application/json',
  },
});

export default axiosInstance;
