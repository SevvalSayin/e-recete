import express from 'express';
import serveStatic from 'serve-static';
import path from 'path';
import cors from 'cors';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ObjectId } from 'mongodb'; // Assuming you're using this for MongoDB ObjectId


// Set __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express
const app = express();
app.use(express.json());  // Parse incoming JSON requests

// CORS setup to allow requests from your React frontend
const corsOptions = {
  origin: '*',  // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'api-key', 'Accept']  // Allowed headers
};
app.use(cors(corsOptions));

// Create an axios instance to communicate with MongoDB API
const apiClient = axios.create({
  baseURL: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-nauitwn/endpoint/data/v1',  // MongoDB API URL
  headers: {
    'api-key': 'Rvc6CNklg8YuyDRi014MSZennyqBH5Xib8yhWMSDJ4kk42HOnozkB0T5IVw1C9TG'  // API Key
  }
});

// Proxy any API requests to the MongoDB Data API
app.use('/api', async (req, res) => {
  try {
    const response = await apiClient({
      method: req.method,
      url: req.url,
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error in MongoDB API Proxy:', error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      res.status(500).json({ message: 'No response received from MongoDB API' });
    } else {
      res.status(500).json({ message: 'Error setting up request to MongoDB API' });
    }
  }
});

// Insert Many API route
app.post('/api/action/insertMany', async (req, res) => {
  console.log('Received data for InsertMany:', req.body);
  const { documents } = req.body;

  // Field mapping for document keys
  const fieldMapping = {
    __EMPTY: 'İlaç Adı',
    __EMPTY_1: 'Barkod',
    __EMPTY_2: 'ATC Kodu',
    __EMPTY_3: 'ATC Adı',
    __EMPTY_4: 'Firma Adı',
    __EMPTY_5: 'Reçete Türü',
    __EMPTY_6: 'Durum'
  };

  // Map incoming documents using fieldMapping
  const mappedDocuments = documents.map(doc => {
    const mappedDoc = {};
    Object.keys(fieldMapping).forEach((key) => {
      if (doc[key]) {  // Only map existing keys
        mappedDoc[fieldMapping[key]] = doc[key];
      }
    });
    return {
      ...mappedDoc,
      _id: doc._id || new ObjectId(),  // Generate _id if missing
      __rowNum__: doc.__rowNum__
    };
  });

  const data = {
    collection: 'kayıt',
    database: 'deneme',
    dataSource: 'e-recete',
    documents: mappedDocuments,
  };

  try {
    const response = await apiClient.post('/action/insertMany', data);
    console.log('InsertMany success:', response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('InsertMany failed:', error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Serve static files from the 'dist' directory (for the React frontend)
// Statik dosya sunmak için 'data' klasörünü tanımla
app.use('/data', express.static(path.join(__dirname, 'data')));


// Serve the frontend (React app) for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server on port 3005 or the port specified in environment variables
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
