import axios from 'axios';

// `axiosInstance`'ı yalnızca bir kez tanımlayın ve export edin
const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'api-key': 'Rvc6CNklg8YuyDRi014MSZennyqBH5Xib8yhWMSDJ4kk42HOnozkB0T5IVw1C9TG',
    'Accept': 'application/json',
  },
  maxBodyLength: Infinity,
});

export default axiosInstance;
