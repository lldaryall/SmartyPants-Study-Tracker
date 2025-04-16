const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = require('./middleware/auth');
const StudySession = require('./models/StudySession');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Dummy user for authentication (For demo; secure implementations should use a database)
const dummyUser = {
  username: "student",
  password: "password"  // In production, store hashed passwords!
};

// Auth route: login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if(username === dummyUser.username && password === dummyUser.password){
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Protected route: get all study sessions
app.get('/api/study-sessions', authMiddleware, async (req, res) => {
  try {
    const sessions = await StudySession.find({ user: req.user.username });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected route: create a new study session
app.post('/api/study-sessions', authMiddleware, async (req, res) => {
  try {
    const { subject, duration, date } = req.body;
    const session = new StudySession({
      user: req.user.username,
      subject,
      duration,
      date: date || new Date()
    });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
