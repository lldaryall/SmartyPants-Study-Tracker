import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await api.login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await api.resetPassword(showForgotPassword.email);
      alert(result.message); // In real app, this would be sent via email
      setShowForgotPassword(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.register(showCreateAccount.username, showCreateAccount.password, showCreateAccount.email);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  if (showForgotPassword) {
    return (
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ color: '#2c3e50', margin: 0 }}>🔐 Reset Password</h1>
            <p style={{ color: '#7f8c8d', margin: '0.5rem 0 0 0' }}>Enter your email to receive a reset code</p>
          </div>
          
          {error && (
            <div style={{ 
              backgroundColor: '#f8d7da', 
              color: '#721c24', 
              padding: '0.75rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              border: '1px solid #f5c6cb'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleForgotPassword}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Email:
              </label>
              <input 
                type="email" 
                value={showForgotPassword.email || ''} 
                onChange={e => setShowForgotPassword({...showForgotPassword, email: e.target.value})} 
                required 
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
              style={{ 
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              Send Reset Code
            </button>
          </form>
          
          <button 
            onClick={() => setShowForgotPassword(false)}
            style={{ 
              width: '100%',
              padding: '0.5rem',
              backgroundColor: 'transparent',
              color: '#6c757d',
              border: '1px solid #6c757d',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (showCreateAccount) {
    return (
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ color: '#2c3e50', margin: 0 }}>📝 Create Account</h1>
            <p style={{ color: '#7f8c8d', margin: '0.5rem 0 0 0' }}>Join Smarty Pants Study Tracker</p>
          </div>
          
          {error && (
            <div style={{ 
              backgroundColor: '#f8d7da', 
              color: '#721c24', 
              padding: '0.75rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              border: '1px solid #f5c6cb'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleCreateAccount}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Username:
              </label>
              <input 
                type="text" 
                value={showCreateAccount.username || ''} 
                onChange={e => setShowCreateAccount({...showCreateAccount, username: e.target.value})} 
                required 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Email:
              </label>
              <input 
                type="email" 
                value={showCreateAccount.email || ''} 
                onChange={e => setShowCreateAccount({...showCreateAccount, email: e.target.value})} 
                required 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Password:
              </label>
              <input 
                type="password" 
                value={showCreateAccount.password || ''} 
                onChange={e => setShowCreateAccount({...showCreateAccount, password: e.target.value})} 
                required 
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
              style={{ 
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              Create Account
            </button>
          </form>
          
          <button 
            onClick={() => setShowCreateAccount(false)}
            style={{ 
              width: '100%',
              padding: '0.5rem',
              backgroundColor: 'transparent',
              color: '#6c757d',
              border: '1px solid #6c757d',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#2c3e50', margin: 0 }}>📚 Smarty Pants</h1>
          <p style={{ color: '#7f8c8d', margin: '0.5rem 0 0 0' }}>Study Tracker</p>
        </div>
        
        {error && (
          <div style={{ 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            padding: '0.75rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Username:
            </label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              autoFocus 
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Password:
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
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
            style={{ 
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            Login
          </button>
        </form>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <button 
            onClick={() => setShowForgotPassword(true)}
            style={{ 
              padding: '0.5rem',
              backgroundColor: 'transparent',
              color: '#dc3545',
              border: 'none',
              fontSize: '0.9rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Forgot Password?
          </button>
          <button 
            onClick={() => setShowCreateAccount(true)}
            style={{ 
              padding: '0.5rem',
              backgroundColor: 'transparent',
              color: '#28a745',
              border: 'none',
              fontSize: '0.9rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Create Account
          </button>
        </div>
        
        <div style={{ 
          padding: '1rem',
          backgroundColor: '#e9ecef',
          borderRadius: '4px',
          fontSize: '0.9rem',
          color: '#6c757d'
        }}>
          <strong>Test Credentials:</strong><br />
          Username: <code>student</code> | Password: <code>password123</code><br />
          Username: <code>demo</code> | Password: <code>demo123</code>
        </div>
      </div>
    </div>
  );
}

export default Login;
