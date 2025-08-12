require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ensure uploads folder exists
const uploads = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploads)) fs.mkdirSync(uploads);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-blog-fixed';

mongoose.connect(MONGO).then(()=> console.log('MongoDB connected')).catch(err => { console.error(err); process.exit(1); });

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// In development, expose a simple health route on '/'
if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => res.json({ ok: true }));
}

// In production, serve the React build as static assets
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(frontendBuildPath));

  // Fallback to index.html for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

app.listen(PORT, ()=> console.log('Server running on port', PORT));
