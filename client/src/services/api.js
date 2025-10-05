// Local storage based API for GitHub Pages deployment
class LocalStorageAPI {
  constructor() {
    this.storageKey = 'smarty-pants-study-sessions';
    this.authKey = 'smarty-pants-auth';
  }

  // Authentication methods
  login(username, password) {
    // Simple demo authentication
    if (username === 'student' && password === 'password') {
      const token = 'demo-token-' + Date.now();
      localStorage.setItem(this.authKey, JSON.stringify({ token, username }));
      return Promise.resolve({ token });
    }
    return Promise.reject(new Error('Invalid credentials'));
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
