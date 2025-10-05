// Local storage based API for GitHub Pages deployment
class LocalStorageAPI {
  constructor() {
    this.storageKey = 'smarty-pants-study-sessions';
    this.authKey = 'smarty-pants-auth';
    this.usersKey = 'smarty-pants-users';
  }

  // Initialize with default test user
  initializeDefaultUsers() {
    const existingUsers = localStorage.getItem(this.usersKey);
    if (!existingUsers) {
      const defaultUsers = [
        {
          id: 'user-1',
          username: 'student',
          password: 'password123',
          email: 'student@example.com',
          createdAt: new Date().toISOString()
        },
        {
          id: 'user-2', 
          username: 'demo',
          password: 'demo123',
          email: 'demo@example.com',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(this.usersKey, JSON.stringify(defaultUsers));
    }
  }

  // Authentication methods
  login(username, password) {
    this.initializeDefaultUsers();
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      const token = 'demo-token-' + Date.now();
      localStorage.setItem(this.authKey, JSON.stringify({ token, username, userId: user.id }));
      return Promise.resolve({ token, user: { username: user.username, email: user.email } });
    }
    return Promise.reject(new Error('Invalid username or password'));
  }

  register(username, password, email) {
    this.initializeDefaultUsers();
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
      return Promise.reject(new Error('Username already exists'));
    }
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return Promise.reject(new Error('Email already exists'));
    }

    const newUser = {
      id: 'user-' + Date.now(),
      username,
      password,
      email,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    
    // Auto-login after registration
    const token = 'demo-token-' + Date.now();
    localStorage.setItem(this.authKey, JSON.stringify({ token, username, userId: newUser.id }));
    
    return Promise.resolve({ token, user: { username: newUser.username, email: newUser.email } });
  }

  resetPassword(email) {
    this.initializeDefaultUsers();
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return Promise.reject(new Error('No account found with this email'));
    }

    // Generate a simple reset code (in a real app, this would be sent via email)
    const resetCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const resetData = {
      email,
      code: resetCode,
      expires: Date.now() + (10 * 60 * 1000) // 10 minutes
    };
    
    localStorage.setItem('smarty-pants-reset', JSON.stringify(resetData));
    
    return Promise.resolve({ 
      message: `Reset code sent to ${email}. Use code: ${resetCode}`,
      code: resetCode // In real app, this wouldn't be returned
    });
  }

  confirmResetPassword(email, code, newPassword) {
    const resetData = JSON.parse(localStorage.getItem('smarty-pants-reset') || '{}');
    
    if (!resetData.email || resetData.email !== email) {
      return Promise.reject(new Error('Invalid reset request'));
    }
    
    if (resetData.code !== code) {
      return Promise.reject(new Error('Invalid reset code'));
    }
    
    if (Date.now() > resetData.expires) {
      return Promise.reject(new Error('Reset code has expired'));
    }

    // Update password
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      return Promise.reject(new Error('User not found'));
    }
    
    users[userIndex].password = newPassword;
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    localStorage.removeItem('smarty-pants-reset');
    
    return Promise.resolve({ message: 'Password reset successfully' });
  }

  logout() {
    localStorage.removeItem(this.authKey);
  }

  isAuthenticated() {
    return !!localStorage.getItem(this.authKey);
  }

  getAuthToken() {
    const auth = localStorage.getItem(this.authKey);
    return auth ? JSON.parse(auth).token : null;
  }

  getCurrentUser() {
    const auth = localStorage.getItem(this.authKey);
    return auth ? JSON.parse(auth).username : null;
  }

  // Study session methods
  getStudySessions() {
    const sessions = localStorage.getItem(this.storageKey);
    const user = this.getCurrentUser();
    
    if (!sessions) return Promise.resolve([]);
    
    const allSessions = JSON.parse(sessions);
    const userSessions = allSessions.filter(session => session.user === user);
    return Promise.resolve(userSessions);
  }

  createStudySession(sessionData) {
    const sessions = localStorage.getItem(this.storageKey);
    const user = this.getCurrentUser();
    
    const newSession = {
      _id: 'session-' + Date.now(),
      user: user,
      subject: sessionData.subject,
      duration: sessionData.duration,
      date: sessionData.date || new Date().toISOString()
    };

    const allSessions = sessions ? JSON.parse(sessions) : [];
    allSessions.push(newSession);
    localStorage.setItem(this.storageKey, JSON.stringify(allSessions));
    
    return Promise.resolve(newSession);
  }

  // Statistics methods
  getStudyStats() {
    return this.getStudySessions().then(sessions => {
      const subjects = [...new Set(sessions.map(s => s.subject))];
      const totalTime = sessions.reduce((sum, session) => sum + session.duration, 0);
      const sessionsBySubject = subjects.map(subject => ({
        subject,
        totalTime: sessions.filter(s => s.subject === subject).reduce((sum, s) => sum + s.duration, 0),
        sessionCount: sessions.filter(s => s.subject === subject).length
      }));

      return {
        totalSessions: sessions.length,
        totalTime,
        subjects: sessionsBySubject,
        averageSessionTime: sessions.length > 0 ? Math.round(totalTime / sessions.length) : 0
      };
    });
  }
}

const api = new LocalStorageAPI();
export default api;
