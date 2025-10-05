import React, { useEffect, useState } from 'react';
import api from '../services/api';
import StudySessionForm from './StudySessionForm';
import StudyChart from './StudyChart';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const sessionsData = await api.getStudySessions();
      setSessions(sessionsData);
      
      const statsData = await api.getStudyStats();
      setStats(statsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleLogout = () => {
    api.logout();
    navigate('/login');
  };

  const handleSessionAdded = () => {
    fetchSessions();
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h1 style={{ margin: 0, color: '#2c3e50' }}>📚 Smarty Pants Study Tracker</h1>
        <button 
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {stats && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#3498db', 
            color: 'white', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: 0 }}>Total Sessions</h3>
            <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{stats.totalSessions}</p>
          </div>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#2ecc71', 
            color: 'white', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: 0 }}>Total Time</h3>
            <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{formatTime(stats.totalTime)}</p>
          </div>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f39c12', 
            color: 'white', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: 0 }}>Average Session</h3>
            <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{formatTime(stats.averageSessionTime)}</p>
          </div>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#9b59b6', 
            color: 'white', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: 0 }}>Subjects</h3>
            <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{stats.subjects.length}</p>
          </div>
        </div>
      )}

      <StudySessionForm onSessionAdded={handleSessionAdded} />
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Your Study Sessions</h3>
        {sessions.length === 0 ? (
          <p style={{ 
            textAlign: 'center', 
            color: '#7f8c8d',
            fontSize: '1.1rem',
            padding: '2rem',
            backgroundColor: '#ecf0f1',
            borderRadius: '8px'
          }}>
            No sessions logged yet. Start tracking your study time!
          </p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gap: '0.5rem',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {sessions.map(session => (
              <div key={session._id} style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                border: '1px solid #dee2e6'
              }}>
                <strong>{session.subject}</strong> - {formatTime(session.duration)} on {new Date(session.date).toLocaleDateString()}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <StudyChart sessions={sessions} />
    </div>
  );
}

export default Dashboard;
