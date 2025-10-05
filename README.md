# 📚 Smarty Pants Study Tracker

A modern, responsive study tracking application built with React and designed for GitHub Pages hosting. Track your study sessions, visualize your progress, and stay motivated with beautiful charts and statistics.

## ✨ Features

- **📊 Study Session Tracking**: Log study sessions with subject and duration
- **📈 Visual Analytics**: Beautiful charts showing study time distribution by subject
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **💾 Local Storage**: Data persists in your browser (no server required)
- **🎨 Modern UI**: Clean, intuitive interface with emoji icons
- **📊 Statistics Dashboard**: View total time, sessions, and averages at a glance
- **🔐 User Authentication**: Create accounts, login, and password reset functionality
- **👥 Multi-User Support**: Each user has their own study data

## 🚀 Live Demo

Visit the live application: [Smarty Pants Study Tracker](https://lldaryall.github.io/SmartyPants-Study-Tracker)

## 🔑 Test Credentials

- **Username**: `student` | **Password**: `password123`
- **Username**: `demo` | **Password**: `demo123`

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: Inline CSS with modern design principles
- **Storage**: Browser localStorage
- **Deployment**: GitHub Pages

## 📦 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/lldaryall/SmartyPants-Study-Tracker.git
   cd SmartyPants-Study-Tracker
   ```

2. Install dependencies:
   ```bash
   cd client
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## 🎯 How to Use

1. **Login**: Use the test credentials or create a new account
2. **Add Sessions**: Click "Add Study Session" to log your study time
3. **View Statistics**: See your total study time, session count, and averages
4. **Analyze Progress**: Check the chart to see which subjects you're focusing on
5. **Track History**: View all your past study sessions in the list

## 🔐 Authentication Features

### Login
- Use existing test credentials or create a new account
- Secure authentication with localStorage-based sessions

### Create Account
- Register with username, email, and password
- Automatic login after successful registration
- Username and email uniqueness validation

### Forgot Password
- Enter your email to receive a reset code
- Use the reset code to set a new password
- Reset codes expire after 10 minutes

## 📊 Features Overview

### Dashboard
- **Statistics Cards**: Total sessions, total time, average session time, and number of subjects
- **Session Form**: Easy-to-use form for adding new study sessions
- **Session History**: Scrollable list of all your study sessions
- **Progress Chart**: Visual representation of study time by subject

### Data Persistence
- All data is stored locally in your browser
- No server or database required
- Data persists between sessions
- Each user has their own isolated data

## 🎨 Design Philosophy

- **Clean & Modern**: Minimalist design with focus on usability
- **Responsive**: Works seamlessly across all device sizes
- **Accessible**: Clear typography and intuitive navigation
- **Motivational**: Visual feedback and progress tracking to encourage consistent study habits

## 🔧 Customization

The application is built with modularity in mind. You can easily:
- Modify the color scheme by updating the CSS variables
- Add new chart types by extending the Chart.js configuration
- Implement additional features like study goals or reminders
- Extend the authentication system for more advanced features

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy Studying! 📚✨**
