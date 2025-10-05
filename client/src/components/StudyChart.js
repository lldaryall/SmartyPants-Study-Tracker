import React from 'react';
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Study Time Distribution by Subject'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes'
        }
      }
    }
  };

  return (
    <div style={{ 
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📊 Study Time by Subject</h3>
      {sessions.length === 0 ? (
        <p style={{ 
          textAlign: 'center', 
          color: '#7f8c8d',
          padding: '2rem'
        }}>
          No data to display yet. Add some study sessions to see your progress!
        </p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
}

export default StudyChart;
