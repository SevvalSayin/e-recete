const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(serveStatic(path.join(__dirname, 'dist')));

// Sample data for search functionality
const articles = [
    { id: 1, title: "React Introduction" },
    { id: 2, title: "Understanding JavaScript" },
    { id: 3, title: "Advanced CSS Techniques" },
    // Add more sample articles as needed
];

// API endpoint for search functionality
app.get('/api/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const results = articles.filter(article => article.title.toLowerCase().includes(query));
    res.json(results);
});

// Handle all routes by serving 'index.html'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});