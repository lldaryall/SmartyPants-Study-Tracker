# Smarty Pants Study Tracker

A Smart Study Tracker app built with the MERN stack (MongoDB, Express, React, Node.js). Log your study sessions, view your progress through data visualization, and manage your study workflow with ease.

## Features
- User authentication with JWT (dummy user for demo purposes)
- CRUD operations for study sessions (subject, duration, date)
- Dashboard displaying your sessions and a bar chart summarizing study time by subject
- Responsive design and a modern React frontend

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local or cloud)
  
### Server Setup
1. Open a terminal and navigate to the `server` folder:
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
   - `JWT_SECRET` (any secret phrase)
4. Start the server:
    ```bash
    npm start
    ```
   The backend will run on port **5000**.

### Client Setup
1. In another terminal, navigate to the `client` folder:
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

## Deployment
- **Client:** Deploy on Netlify, Vercel, or GitHub Pages.
- **Server:** Deploy on Heroku, Render, or any Node hosting platform.

## License
MIT License
