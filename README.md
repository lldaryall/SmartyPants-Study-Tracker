# Smarty Pants Study Tracker

A study tracking application I built to help students monitor their study habits and visualize their progress. This project was created as part of my learning journey with the MERN stack.

## What It Does

- Lets you log your study sessions with:
  - Subject name
  - Duration in minutes
  - Date of study
- Shows your study history in a simple list
- Displays a bar chart of your total study time per subject
- Keeps your data secure with user authentication

## How It Works

The app is split into two parts:

### Frontend (Client)
- Built with React
- Uses Chart.js for the study time visualization
- Simple, clean interface
- Runs on port 3000 (or another port if 3000 is in use)

### Backend (Server)
- Node.js with Express
- MongoDB for storing study sessions
- JWT for user authentication
- Runs on port 5001

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/lldaryall/SmartyPants-Study-Tracker.git
```

2. Start the server:
```bash
cd server
npm install
npm start
```

3. Start the client:
```bash
cd client
npm install
npm start
```

## Default Login
- Username: student
- Password: password

## Current Status
- Frontend is deployed to GitHub Pages
- Backend is running locally on port 5001
- MongoDB connection is working

## Future Improvements
- Add user registration
- Implement more detailed analytics
- Add study goals and reminders
- Improve the mobile experience

## Technologies Used
- React
- Node.js
- Express
- MongoDB
- Chart.js
- JWT for authentication

## Contact
Feel free to reach out with any questions or suggestions!
- GitHub: [lldaryall](https://github.com/lldaryall)
