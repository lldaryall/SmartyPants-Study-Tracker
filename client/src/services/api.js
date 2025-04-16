import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.herokuapp.com/api'  // Replace with your backend URL
    : 'http://localhost:5001/api'
});

export default api;
