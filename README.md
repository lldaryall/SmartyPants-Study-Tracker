import os
import zipfile

# Define the base project directory name
project_name = "smarty-pants-study-tracker"
base_dir = os.path.join(os.getcwd(), project_name)

# List of directories to create
dirs = [
    base_dir,
    os.path.join(base_dir, "server"),
    os.path.join(base_dir, "server", "middleware"),
    os.path.join(base_dir, "server", "models"),
    os.path.join(base_dir, "client"),
    os.path.join(base_dir, "client", "public"),
    os.path.join(base_dir, "client", "src"),
    os.path.join(base_dir, "client", "src", "components"),
    os.path.join(base_dir, "client", "src", "services"),
]

# Create directory structure
for d in dirs:
    os.makedirs(d, exist_ok=True)

# Files to create with their contents
files = {
    # Root Files
    os.path.join(base_dir, "README.md"): r"""# Smarty Pants Study Tracker

A Smart Study Tracker app built with the MERN stack (MongoDB, Express, React, Node.js). Log your study sessions, view your progress through data visualization, and manage your study workflow with ease.

## Features
- User authentication with JWT
- CRUD operations for study sessions (subject, duration, date)
- Dashboard displaying your sessions and a bar chart summarizing study time by subject
- Responsive design and a modern React frontend

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud)
  
### Server Setup
1. Navigate to the server directory:
    ```bash
    cd server
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
   Then edit `.env` to include your:
   - `MONGO_URI` (your MongoDB connection string)
   - `JWT_SECRET` (any secure secret phrase)
4. Start the server:
    ```bash
    npm start
    ```
   The backend will run on port **5001**.

### Client Setup
1. Navigate to the client directory:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React development server:
    ```bash
    npm start
    ```
   The frontend will run on [http://localhost:3000](http://localhost:3000).

## Usage
1. Open your browser to `http://localhost:3000`
2. Log in with the default credentials:
   - Username: `student`
   - Password: `password`
3. Start tracking your study sessions!

## Deployment
- **Client:** Deploy on Netlify, Vercel, or GitHub Pages
- **Server:** Deploy on Heroku, Render, or any Node hosting platform

## License
MIT License
""",
    os.path.join(base_dir, ".gitignore"): r"""node_modules
""",
    # Server Files
    os.path.join(base_dir, "server", "package.json"): r"""{
  "name": "smarty-pants-study-tracker-server",
  "version": "1.0.0",
  "description": "Backend for Smarty Pants Study Tracker",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.2.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
""",
    os.path.join(base_dir, "server", ".env.example"): r"""PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
""",
    os.path.join(base_dir, "server", "index.js"): r"""const express = require('express');
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
""",
    os.path.join(base_dir, "server", "middleware", "auth.js"): r"""const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).json({ message: 'No token provided' });
  
  const token = authHeader.split(' ')[1];
  if(!token) return res.status(401).json({ message: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err) {
    res.status(401).json({ message: 'Token invalid' });
  }
}
""",
    os.path.join(base_dir, "server", "models", "StudySession.js"): r"""const mongoose = require('mongoose');

const StudySessionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  subject: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudySession', StudySessionSchema);
""",
    # Client Files
    os.path.join(base_dir, "client", "package.json"): r"""{
  "name": "smarty-pants-study-tracker-client",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.3.4",
    "chart.js": "^4.2.1",
    "react": "^18.2.0",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
""",
    os.path.join(base_dir, "client", ".gitignore"): r"""node_modules
/build
""",
    os.path.join(base_dir, "client", "public", "index.html"): r"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Smarty Pants Study Tracker" />
    <title>Smarty Pants Study Tracker</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
""",
    os.path.join(base_dir, "client", "src", "index.js"): r"""import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
""",
    os.path.join(base_dir, "client", "src", "App.js"): r"""import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
""",
    os.path.join(base_dir, "client", "src", "components", "Login.js"): r"""import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("student");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} autoFocus />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Login</button>
      </form>
    </div>
  );
}

export default Login;
""",
    os.path.join(base_dir, "client", "src", "components", "Dashboard.js"): r"""import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudySessionForm from './StudySessionForm';
import StudyChart from './StudyChart';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/study-sessions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSessionAdded = () => {
    fetchSessions();
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <StudySessionForm onSessionAdded={handleSessionAdded} />
      <h3>Your Study Sessions</h3>
      {sessions.length === 0 ? (
        <p>No sessions logged yet.</p>
      ) : (
        <ul>
          {sessions.map(session => (
            <li key={session._id}>
              {session.subject} - {session.duration} minutes on {new Date(session.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
      <StudyChart sessions={sessions} />
    </div>
  );
}

export default Dashboard;
""",
    os.path.join(base_dir, "client", "src", "components", "StudySessionForm.js"): r"""import React, { useState } from 'react';
import axios from 'axios';

function StudySessionForm({ onSessionAdded }) {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/study-sessions',
        { subject, duration: parseInt(duration) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubject('');
      setDuration('');
      onSessionAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Add Study Session</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject: </label>
          <input type="text" value={subject} onChange={e => setSubject(e.target.value)} required />
        </div>
        <div>
          <label>Duration (minutes): </label>
          <input type="number" value={duration} onChange={e => setDuration(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Add Session</button>
      </form>
    </div>
  );
}

export default StudySessionForm;
""",
    os.path.join(base_dir, "client", "src", "components", "StudyChart.js"): r"""import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StudyChart({ sessions }) {
  const subjects = [...new Set(sessions.map(s => s.subject))];
  const data = {
    labels: subjects,
    datasets: [
      {
        label: 'Total Study Time (min)',
        data: subjects.map(subject =>
          sessions.filter(s => s.subject === subject).reduce((sum, curr) => sum + curr.duration, 0)
        ),
        backgroundColor: 'rgba(75,192,192,0.6)'
      }
    ]
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Study Time by Subject</h3>
      <Bar data={data} />
    </div>
  );
}

export default StudyChart;
""",
    # Optional: client/src/services/api.js
    os.path.join(base_dir, "client", "src", "services", "api.js"): r"""import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default api;
"""
}

# Write all files to disk
for filepath, content in files.items():
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

# Now zip the project folder into smarty-pants-study-tracker.zip
zip_filename = "smarty-pants-study-tracker.zip"
with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, file_names in os.walk(base_dir):
        for file in file_names:
            abs_filename = os.path.join(root, file)
            rel_filename = os.path.relpath(abs_filename, os.path.join(base_dir, '..'))
            zipf.write(abs_filename, rel_filename)

print(f"Project created and zipped successfully as {zip_filename}")
