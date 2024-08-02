const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'api-key', 'Accept']
};

app.use(cors(corsOptions));
app.use(express.json()); 

app.use('/api', async (req, res) => {
  const url = `https://eu-central-1.aws.data.mongodb-api.com/app/data-nauitwn/endpoint/data/v1${req.url}`;
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
    console.error('Proxy error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Serve static files
app.use(serveStatic(path.join(__dirname, 'dist')));

// Handle all routes by serving 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
