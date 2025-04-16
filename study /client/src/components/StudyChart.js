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

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Study Time by Subject</h3>
      <Bar data={data} />
    </div>
  );
}

export default StudyChart;
