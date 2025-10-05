import React, { useState } from 'react';
import api from '../services/api';

function StudySessionForm({ onSessionAdded }) {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.createStudySession({ 
        subject, 
        duration: parseInt(duration) 
      });
      setSubject('');
      setDuration('');
      onSessionAdded();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      marginTop: '1rem',
      padding: '1.5rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📝 Add Study Session</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Subject:
          </label>
          <input 
            type="text" 
            value={subject} 
            onChange={e => setSubject(e.target.value)} 
            required 
            placeholder="e.g., Mathematics, Science, History..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Duration (minutes):
          </label>
          <input 
            type="number" 
            value={duration} 
            onChange={e => setDuration(e.target.value)} 
            required 
            min="1"
            placeholder="30"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            padding: '0.75rem 1.5rem',
            backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {isSubmitting ? 'Adding...' : 'Add Session'}
        </button>
      </form>
    </div>
  );
}

export default StudySessionForm;
