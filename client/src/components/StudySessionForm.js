import React, { useState } from 'react';
import axios from 'axios';

function StudySessionForm({ onSessionAdded }) {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5001/api/study-sessions',
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
