  // src/apiService.js

  import axiosInstance from './axiosInstance';
  export const insertDocument = async (document) => {
    const data = {
      collection: 'kayıt',
      database: 'deneme',
      dataSource: 'e-recete',
      document,
    };

    try {
      const response = await axiosInstance.post('/action/insertOne', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
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
      return response.data.documents;
    } catch (error) {
      handleApiError(error);
    }
  };




  // Function to sign up a user
  export const signUpUser = async ({ tc, password, name, surname }) => {
    const existingUsers = await findDocuments({ tc });

    if (existingUsers.length > 0) {
      throw new Error('Sorry, a user with this TC number already exists.');
    }

    const document = { tc, password, name, surname };
    console.log('Signing up user with TC:', tc, 'and password:', password, 'name:', name, 'surname:', surname);
    return await insertDocument(document);
  };

  // Function to sign in a user
  export const signInUser = async ({ tc, sifre }) => {
    console.log('Signing in user with TC:', tc, 'and password:', sifre);
    const result = await findDocuments({ tc, password: sifre });
    console.log('Find documents result:', result);
    return result;
  };

  // Function to update user information
  export const signUpdateUser = async ({ name, surname, tc, email, phone, date, length, weight, blood }) => {
    const filter = { tc };
    const update = { $set: { name, surname, email, phone, date, length, weight, blood } };

    try {
      console.log('Updating user with data:', update);
      const response = await axiosInstance.post('/action/updateOne', {
        collection: 'kayıt',
        database: 'deneme',
        dataSource: 'e-recete',
        filter,
        update
      });
      console.log('Update response:', response);
      return response.data;
    } catch (error) {
      console.error('Update error:', error.message);
      throw new Error('Failed to update user information.');
    }
  };

  export const insertManyDocuments = async (documents) => {
    if (!Array.isArray(documents) || documents.length === 0) {
      throw new Error('Belge dizisi geçersiz veya boş.');
    }

    const data = {
      collection: 'kayıt',
      database: 'deneme',
      dataSource: 'e-recete',
      documents,
    };

    try {
      console.log('Birden çok belge ekleniyor:', data);
      const response = await axiosInstance.post('/action/insertMany', data);
      console.log('Birden Çok Ekleme Yanıtı:', response.data);
      return response.data;
    } catch (error) {
      console.error('API isteği hatası:', error.message);
      if (error.response) {
        console.error('Hata Yanıtı Verileri:', error.response.data);
        throw new Error(`Hata: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error('Yanıt alınamadı:', error.request);
        throw new Error('Sunucudan yanıt alınamadı.');
      } else {
        console.error('İstek ayarlama hatası:', error.message);
        throw new Error('İsteği ayarlarken bir hata oluştu.');
      }
    }
  };

  // Function to send raw data to the API service
  export const sendRawDataToApiService = async (data) => {
    const filteredData = data.filter(doc => Object.keys(doc).length > 0);

    if (filteredData.length === 0) {
      console.warn('No valid data to send to API.');
      return;
    }

    const requestData = {
      collection: 'kayıt',
      database: 'deneme',
      dataSource: 'e-recete',
      documents: filteredData,
    };

    try {
      console.log('Sending raw data to API service:', requestData);
      const response = await axiosInstance.post('/action/insertMany', requestData);
      console.log('Raw Data Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API request error:', error.message);
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
        throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        throw new Error('No response received from the server.');
      } else {
        throw new Error('Error setting up the request.');
      }
    }
  };
