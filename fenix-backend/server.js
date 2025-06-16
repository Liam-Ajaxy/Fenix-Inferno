// === IMPORTS ===
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'SiaBgdBw10/H4ck3r_db.sql',
  database: 'fenixdb'
};


const app = express();
const JWT_SECRET = 'siabgdbw10/h4ck3r.jwt';

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());

// === CONTACT FORM API ===
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('Received message data:', req.body); // <== log entire body

      // Name validation (place this here!)
      const nameRegex = /^[a-zA-Z\s'-]+$/;
      
      if (!nameRegex.test(name)) {
      return res.status(400).json({ success: false, message: 'Invalid name format.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'user74251224.us@gmail.com',
        pass: 'mtdfpccjhigleumm'
      }
    });

    const mailOptions = {
      from: email,
      to: 'user74251224.us@gmail.com',
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



// =========== Lgin ===================
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    await connection.end();

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, userName: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' } // Token valid for 2 hours
    );

    // Send back token and user info
    res.json({
      success: true,
      token,        // JWT token
      userName: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// ==================== Sign Up ====================
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Check if user already exists
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      await connection.end();
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
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
let projects = [
  {
    title: 'Project 1',
    description: 'Description for Project 1',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    title: 'Project 2',
    description: 'Description for Project 2',
    image: 'https://via.placeholder.com/300x200'
  }
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// === ARTICLES API ===
let articles = [
  {
    title: 'Article 1',
    summary: 'Summary for Article 1',
    fullContent: 'Full content of Article 1.',
    icon: 'fas fa-book'
  },
  {
    title: 'Article 2',
    summary: 'Summary for Article 2',
    fullContent: 'Full content of Article 2.',
    icon: 'fas fa-newspaper'
  }
];

app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// === QUOTES API ===
let quotes = [
  { text: 'The best way to predict the future is to invent it.' },
  { text: 'Simplicity is the ultimate sophistication.' }
];

app.get('/api/quotes', (req, res) => {
  res.json(quotes);
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

app.get('/api/settings', (req, res) => {
  res.json(settings);
});

app.post('/api/settings', (req, res) => {
  settings = req.body;
  console.log('Settings updated:', settings);
  res.json({ message: 'Settings updated successfully' });
});

// === START SERVER ===
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 FENIX Backend running at http://localhost:${PORT}`);
});
