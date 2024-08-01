const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://e-recete-f15179303064.herokuapp.com', // Allow only your Heroku app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'api-key', 'Accept']
};

app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON bodies

app.use(serveStatic(path.join(__dirname, 'dist')));

// Example endpoint
app.post('/api/action/find', async (req, res) => {
  // Handle the find action
  const { filter } = req.body;
  // Your database logic here
  res.json({ message: 'Find action received', filter });
});

// Handle all routes by serving 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
