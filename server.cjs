import express from 'express';
import serveStatic from 'serve-static';
import path from 'path';
import cors from 'cors';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Set up __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'api-key', 'Accept']
};

app.use(cors(corsOptions));

// Create an axios instance
const apiClient = axios.create({
  baseURL: 'https://new-mongodb-api-url.com/endpoint',
  headers: {
    'api-key': 'Rvc6CNklg8YuyDRi014MSZennyqBH5Xib8yhWMSDJ4kk42HOnozkB0T5IVw1C9TG'
  }
});

// Proxy API requests
app.use('/api', async (req, res) => {
  try {
    const response = await apiClient({
      method: req.method,
      url: req.url,
      data: req.body
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error in MongoDB API Proxy:', error.response?.data || error.message);
    res.status(500).send('Internal Server Error');
  }
});

// InsertMany endpoint
app.post('/api/action/insertMany', async (req, res) => {
  const { documents } = req.body;

  const alanEşleştirme = {
    __EMPTY: 'İlaç Adı',
    __EMPTY_1: 'Barkod',
    __EMPTY_2: 'ATC Kodu',
    __EMPTY_3: 'ATC Adı',
    __EMPTY_4: 'Firma Adı',
    __EMPTY_5: 'Reçete Türü',
    __EMPTY_6: 'Durum'
  };

  const eşlenmişDokümanlar = documents.map(doc => {
    const eşlenmişDoc = {};

    Object.keys(alanEşleştirme).forEach((key) => {
      if (doc[key] !== undefined) {
        eşlenmişDoc[alanEşleştirme[key]] = doc[key];
      }
    });

    return {
      ...eşlenmişDoc,
      _id: doc._id,
      __rowNum__: doc.__rowNum__
    };
  });

  const data = {
    collection: 'kayıt',
    database: 'deneme',
    dataSource: 'e-recete',
    documents: eşlenmişDokümanlar,
  };

  try {
    const response = await apiClient.post('/data/v1/action/insertMany', data);
    console.log('Toplu ekleme başarılı:', response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Toplu ekleme başarısız:', error.response?.data || error.message);
    res.status(500).send('MongoDB\'ye veri ekleme başarısız oldu.');
  }
});

// Serve static files
app.use(serveStatic(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
