import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ subject: '', duration: 0 });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchSessions();
  }, [navigate]);

  const fetchSessions = async () => {
    try {
      const res = await api.get('/sessions');
      setSessions(res.data);
    } catch (err) {
      setError("Failed to fetch sessions");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/sessions', newSession);
      setNewSession({ subject: '', duration: 0 });
      fetchSessions();
    } catch (err) {
      setError("Failed to create session");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Study Sessions Dashboard</h2>
      <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>Logout</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject: </label>
          <input 
            type="text" 
            value={newSession.subject}
            onChange={e => setNewSession({...newSession, subject: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Duration (minutes): </label>
          <input 
            type="number" 
            value={newSession.duration}
            onChange={e => setNewSession({...newSession, duration: parseInt(e.target.value)})}
            required
            min="1"
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Add Session</button>
      </form>

      <h3>Recent Sessions</h3>
      <ul>
        {sessions.map(session => (
          <li key={session._id}>
            {session.subject} - {session.duration} minutes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard; 