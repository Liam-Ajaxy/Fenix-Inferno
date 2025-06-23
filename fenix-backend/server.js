// === IMPORTS ===
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  credentials: true
}));
app.use(express.json());

// === ENV VARIABLES ===
const JWT_SECRET = process.env.APP_SECRET;
const PORT = process.env.PORT || 3000;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

// === Serve Frontend from ../public ===
app.use(express.static(path.join(__dirname, '../public')));

// === CONTACT FORM API ===
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({ success: false, message: 'Invalid name format.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact from ${name}`,
      text: `Sender Email: ${email}\n\n${message}\n\n\n---\n\nMessage from FENIX Website`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// === LOGIN ===
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ DB connected on Render');
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    await connection.end();

    if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password_hash))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    const token = jwt.sign(
      { userId: user.id, userName: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ success: true, token, userName: user.name, email: user.email });
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// === SIGNUP ===
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      await connection.end();
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await connection.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );

    await connection.end();

    res.json({ success: true, userName: name, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// === PROJECTS API ===
app.get('/api/projects', (req, res) => {
  res.json([
    { title: 'Project 1', description: 'Description for Project 1', image: 'https://via.placeholder.com/300x200' },
    { title: 'Project 2', description: 'Description for Project 2', image: 'https://via.placeholder.com/300x200' }
  ]);
});

// === ARTICLES API ===
app.get('/api/articles', (req, res) => {
  res.json([
    { title: 'Article 1', summary: 'Summary for Article 1', fullContent: 'Full content of Article 1.', icon: 'fas fa-book' },
    { title: 'Article 2', summary: 'Summary for Article 2', fullContent: 'Full content of Article 2.', icon: 'fas fa-newspaper' }
  ]);
});

// === QUOTES API ===
app.get('/api/quotes', (req, res) => {
  res.json([
    { text: 'The best way to predict the future is to invent it.' },
    { text: 'Simplicity is the ultimate sophistication.' }
  ]);
});

// === SETTINGS API ===
let settings = {
  colorMode: 'light',
  language: 'en',
  fontSize: 'medium',
  secureMode: false,
  interfaceDensity: 'Comfortable',
  aiAssistantMode: false,
  colorVision: 'Default',
  soundFeedback: false,
  reducedMotion: false,
  realtimeSync: false,
  languageStyle: 'Formal',
  displayMode: 'Default',
  energySaverMode: false,
  stealthMode: false,
  gestureVoiceCommands: false,
  environmentContextAwareness: false
};

app.get('/api/settings', (req, res) => res.json(settings));
app.post('/api/settings', (req, res) => {
  settings = req.body;
  console.log('Settings updated:', settings);
  res.json({ message: 'Settings updated successfully' });
});

// === TEST DB CONNECTION ===
app.get('/api/test-db', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT NOW() AS server_time');
    await connection.end();

    res.json({ success: true, message: '✅ DB connection successful', serverTime: rows[0].server_time });
  } catch (error) {
    console.error('❌ DB connection test failed:', error.message);
    res.status(500).json({ success: false, message: '❌ Failed to connect to DB', error: error.message });
  }
});


// === START SERVER ===
app.listen(PORT, () => {
  console.log(`🚀 FENIX Backend running at http://localhost:${PORT}`);
});
