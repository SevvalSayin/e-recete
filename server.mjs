import express from 'express';
import multer from 'multer';
import * as XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';
import cors from 'cors';

// Set __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express
const app = express();
app.use(express.json());

// CORS setup to allow requests from your React frontend
const corsOptions = {
  origin: '*',  // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'api-key', 'Accept']  // Allowed headers
};
app.use(cors(corsOptions));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Create an axios instance to communicate with MongoDB API
const apiClient = axios.create({
  baseURL: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-nauitwn/endpoint/data/v1',
  headers: {
    'api-key': 'Rvc6CNklg8YuyDRi014MSZennyqBH5Xib8yhWMSDJ4kk42HOnozkB0T5IVw1C9TG'
  }
});

// Field mappings for different files
const atcFieldMapping = {
  __EMPTY: 'İlaç Adı',
  __EMPTY_1: 'Barkod',
  __EMPTY_2: 'ATC Kodu',
  __EMPTY_3: 'ATC Adı',
  __EMPTY_4: 'Firma Adı',
  __EMPTY_5: 'Reçete Türü',
  __EMPTY_6: 'Durum'
};

const icdFieldMapping = {
  'Adı': 'Name',
  'Kodu': 'Code',
  'Üst Kodu': 'Upper Code',
  'Seviye': 'Level',
  'Yüksek Riskli Gebelik': 'High Risk'
};

const loincFieldMapping = {
  'LOINC_NUM': 'Code',
  'LONG_COMMON_NAME': 'Name',
  'COMPONENT': 'Component',
  'PROPERTY': 'Property',
  'TIME_ASPCT': 'Time Aspect',
  'SYSTEM': 'System',
  'SCALE_TYP': 'Scale Type',
};

// Helper function to read Excel file and map fields
async function readExcelFile(filePath, fieldMapping) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);

  return data.map(row => {
    const newRow = {};
    let isEmpty = true;
    Object.keys(row).forEach(key => {
      const mappedKey = fieldMapping[key];
      if (mappedKey && row[key] !== undefined && row[key] !== null && row[key] !== '') {
        newRow[mappedKey] = row[key];
        isEmpty = false;
      }
    });
    return isEmpty ? null : newRow;
  }).filter(row => row !== null);
}


// Upload and process Excel file
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    let fieldMapping;
    if (req.body.isAtc) {
      fieldMapping = atcFieldMapping;
    } else if (req.body.isIcd) {
      fieldMapping = icdFieldMapping;
    } else if (req.body.isLoinc) {
      fieldMapping = loincFieldMapping;
    } else {
      throw new Error('Invalid file type specified');
    }

    const documents = await readExcelFile(filePath, fieldMapping);

    const data = {
      collection: 'kayıt',
      database: 'deneme',
      dataSource: 'e-recete',
      documents: documents,
    };

    const response = await apiClient.post('/action/insertMany', data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error in API request:', error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
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

// Serve static files from the 'dist' directory (for the React frontend)
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server on port 3005 or the port specified in environment variables
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
