import React, { useEffect, useState } from 'react';
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
