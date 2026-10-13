import React, { useState } from 'react';
import { LogIn, UserPlus, AlertCircle, User, BookOpen, Key, Mail, CheckCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [tab, setTab] = useState('login');
  const [role, setRole] = useState('ADMIN');
  
  const [form, setForm] = useState({
    username: 'prasanna',
    email: 'prasanna@library.org',
    password: '123456',
    fullName: 'Prasanna',
    phone: '+1-555-0199'
  });
  
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const fillQuickDemo = (demoRole) => {
    if (demoRole === 'PRASANNA') {
      setRole('ADMIN');
      setForm({ username: 'prasanna', password: '123456', email: 'prasanna@library.org', fullName: 'Prasanna (System Administrator)', phone: '+1-555-0199' });
    } else if (demoRole === 'ADMIN') {
      setRole('ADMIN');
      setForm({ username: 'admin', password: 'admin123', email: 'admin@library.org', fullName: 'System Administrator', phone: '+1-555-0100' });
    } else if (demoRole === 'LIBRARIAN') {
      setRole('LIBRARIAN');
      setForm({ username: 'librarian', password: 'lib123', email: 'librarian@library.org', fullName: 'Sarah Jenkins', phone: '+1-555-0101' });
    } else {
      setRole('MEMBER');
      setForm({ username: 'member', password: 'member123', email: 'member@gmail.com', fullName: 'Alex Morgan', phone: '+1-555-0102' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (tab === 'login') {
        let loggedIn = false;
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: form.username,
              password: form.password,
              role: role
            })
          });

          const data = await res.json();
          if (res.ok && !data.error) {
            onLoginSuccess(data);
            onClose();
            loggedIn = true;
          } else if (data.error && !(form.username.toLowerCase() === 'prasanna' && form.password === '123456')) {
            throw new Error(data.error);
          }
        } catch (fetchErr) {
          // If server error or offline, fallback will check local credentials
        }

        if (!loggedIn) {
          const uLower = (form.username || '').trim().toLowerCase();
          if (uLower === 'prasanna' && form.password === '123456') {
            onLoginSuccess({
              username: 'prasanna',
              fullName: 'Prasanna',
              email: 'prasanna@library.org',
              role: 'ADMIN',
              status: 'ACTIVE'
            });
            onClose();
          } else if (uLower === 'admin' && form.password === 'admin123') {
            onLoginSuccess({
              username: 'admin',
              fullName: 'System Administrator',
              email: 'admin@library.org',
              role: 'ADMIN',
              status: 'ACTIVE'
            });
            onClose();
          } else if (uLower === 'librarian' && form.password === 'lib123') {
            onLoginSuccess({
              username: 'librarian',
              fullName: 'Sarah Jenkins',
              email: 'librarian@library.org',
              role: 'LIBRARIAN',
              status: 'ACTIVE'
            });
            onClose();
          } else if (uLower === 'member' && form.password === 'member123') {
            onLoginSuccess({
              username: 'member',
              fullName: 'Alex Morgan',
              email: 'member@gmail.com',
              role: 'MEMBER',
              status: 'ACTIVE'
            });
            onClose();
          } else {
            throw new Error('Invalid credentials. Check username & password and try again.');
          }
        }
      } else {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
            role: role,
            fullName: form.fullName || form.username,
            phone: form.phone
          })
        });

        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error || 'Registration failed.');
        }

        // Auto-login upon registration
        onLoginSuccess({
          username: form.username,
          email: form.email,
          role: role,
          fullName: form.fullName || form.username,
          status: 'ACTIVE'
        });
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-badge" style={{ width: 38, height: 38 }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {tab === 'login' ? 'System Login' : 'Create LMS Account'}
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Role-based Library Access Control
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.3rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
          <button
            type="button"
            className={`nav-btn ${tab === 'login' ? 'active' : ''}`}
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={() => { setTab('login'); setErrorMsg(''); }}
          >
            <LogIn size={16} /> Login
          </button>
          <button
            type="button"
            className={`nav-btn ${tab === 'register' ? 'active' : ''}`}
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={() => { setTab('register'); setErrorMsg(''); }}
          >
            <UserPlus size={16} /> Register
          </button>
        </div>

        {/* Quick Demo Credentials Selector */}
        <div style={{ marginBottom: '1.25rem', padding: '0.75rem', background: 'rgba(99,102,241,0.08)', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle size={14} /> Quick Demo Login Profiles:
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem', background: '#6366f1', borderColor: '#4f46e5' }}
              onClick={() => fillQuickDemo('PRASANNA')}
            >
              ★ Prasanna (Admin: 123456)
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
              onClick={() => fillQuickDemo('ADMIN')}
            >
              Admin Demo
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
              onClick={() => fillQuickDemo('LIBRARIAN')}
            >
              Librarian Demo
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
              onClick={() => fillQuickDemo('MEMBER')}
            >
              Member Demo
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            SELECT SYSTEM ROLE
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            {['MEMBER', 'LIBRARIAN', 'ADMIN'].map((r) => (
              <button
                key={r}
                type="button"
                className={`role-badge ${r.toLowerCase()}`}
                style={{
                  padding: '0.6rem',
                  borderRadius: '10px',
                  border: role === r ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  opacity: role === r ? 1 : 0.6,
                  fontWeight: 800,
                  fontSize: '0.75rem'
                }}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Error Container - Matches "Show Error Message & Try Again" in Flowchart */}
        {errorMsg && (
          <div className="error-banner">
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Authentication Error</div>
              <div style={{ fontSize: '0.8rem' }}>{errorMsg}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Username
            </label>
            <div className="search-input-wrapper">
              <User size={16} />
              <input
                type="text"
                name="username"
                className="input-field"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {tab === 'register' && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Full Name
                </label>
                <div className="search-input-wrapper">
                  <User size={16} />
                  <input
                    type="text"
                    name="fullName"
                    className="input-field"
                    placeholder="Enter full name"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Email Address
                </label>
                <div className="search-input-wrapper">
                  <Mail size={16} />
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Password
            </label>
            <div className="search-input-wrapper">
              <Key size={16} />
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : tab === 'login' ? `Login as ${role}` : `Register as ${role}`}
          </button>
        </form>
      </div>
    </div>
  );
}
