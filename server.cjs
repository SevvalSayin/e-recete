import express from 'express';
import serveStatic from 'serve-static';
import path from 'path';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'api-key', 'Accept']
};

app.use(cors(corsOptions));

app.use('/api', async (req, res) => {
  const url = `https://new-mongodb-api-url.com/endpoint${req.url}`;
  const options = {
    url,
    headers: {
      'api-key': 'Rvc6CNklg8YuyDRi014MSZennyqBH5Xib8yhWMSDJ4kk42HOnozkB0T5IVw1C9TG'
    },
    method: req.method,
    data: req.body
  };

  try {
    const response = await axios(options);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error in MongoDB API Proxy:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/action/insertMany', async (req, res) => {
  const { documents } = req.body;

  // Adjust mapping if necessary
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
    const response = await axios.post('https://new-mongodb-api-url.com/endpoint/data/v1/action/insertMany', data, {
      headers: {
        'api-key': 'Rvc6CNklg8YuyDRi014MSZennyqBH5Xib8yhWMSDJ4kk42HOnozkB0T5IVw1C9TG'
      }
    });
    console.log('Toplu ekleme başarılı:', response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Toplu ekleme başarısız:', error.message);
    res.status(500).send('MongoDB\'ye veri ekleme başarısız oldu.');
  }
});

app.use(serveStatic(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
