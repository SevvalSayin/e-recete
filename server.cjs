const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS paketini ekleyin
require('dotenv').config();

const app = express();
app.use(cors()); // CORS'u etkinleştirin
app.use(bodyParser.json());
app.use(serveStatic(path.join(__dirname, 'dist')));

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error(err);
});

// Kullanıcı Şeması
const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  tc: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Kayıt Route'u
app.post('/api/register', async (req, res) => {
  const { name, surname, tc, password } = req.body;

  try {
    const user = new User({ name, surname, tc, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Giriş Route'u
app.post('/api/sign-in', async (req, res) => {
  const { tc, password } = req.body;

  try {
    const user = await User.findOne({ tc, password });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Arama Fonksiyonu İçin Örnek Veri
const articles = [
  { id: 1, title: 'React Introduction' },
  { id: 2, title: 'Understanding JavaScript' },
  { id: 3, title: 'Advanced CSS Techniques' },
];

// Arama Fonksiyonu API Endpoint'i
app.get('/api/search', (req, res) => {
  const query = req.query.query.toLowerCase();
  const results = articles.filter(article => article.title.toLowerCase().includes(query));
  res.json(results);
});

// Tüm Yönlendirmeleri 'index.html' ile Yönet
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
