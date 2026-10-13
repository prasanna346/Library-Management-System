import React, { useState, useEffect, useCallback } from 'react';
import { 
  Mail, Send, CheckCircle2, Clock, 
  RefreshCw, Plus, X 
} from 'lucide-react';

export default function NotificationsView({ currentUser }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: 'member',
    recipientEmail: 'member@gmail.com',
    type: 'OVERDUE_FINE',
    title: '',
    message: ''
  });
  const [statusMsg, setStatusMsg] = useState('');

  const isStaff = currentUser?.role === 'LIBRARIAN' || currentUser?.role === 'ADMIN';

  const fetchNotifications = useCallback(() => {
    setLoading(true);
    const url = isStaff ? '/api/notifications' : `/api/notifications?username=${encodeURIComponent(currentUser?.username || '')}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (Array.isArray(data)) setNotifications(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [isStaff, currentUser?.username]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;

    fetch('/api/notifications/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Name': currentUser?.username || 'admin'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setComposeOpen(false);
        setFormData({
          username: 'member',
          recipientEmail: 'member@gmail.com',
          type: 'OVERDUE_FINE',
          title: '',
          message: ''
        });
        setStatusMsg('Email notification successfully dispatched via automated mail service!');
        setTimeout(() => setStatusMsg(''), 4500);
        fetchNotifications();
      })
      .catch(() => {});
  };

  const handleMarkRead = (id) => {
    fetch(`/api/notifications/${id}/read`, { method: 'PUT' })
      .then(() => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'READ' } : n));
      })
      .catch(() => {});
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case 'OVERDUE_FINE':
        return { color: '#f87171', bg: 'rgba(239, 68, 68, 0.15)', border: '#ef4444', label: 'Overdue Fine Alert' };
      case 'DUE_REMINDER':
        return { color: '#fbbf24', bg: 'rgba(245, 158, 11, 0.15)', border: '#f59e0b', label: 'Due Date Reminder' };
      case 'RESERVATION_READY':
        return { color: '#34d399', bg: 'rgba(16, 185, 129, 0.15)', border: '#10b981', label: 'Reservation Ready' };
      case 'BOOK_ISSUED':
        return { color: '#60a5fa', bg: 'rgba(59, 130, 246, 0.15)', border: '#3b82f6', label: 'Issue Confirmed' };
      default:
        return { color: '#c4b5fd', bg: 'rgba(139, 92, 246, 0.15)', border: '#8b5cf6', label: 'Library Notice' };
    }
  };

  return (
    <div className="glass-card" style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <Mail size={22} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
              Email Notifications & Fine Notices
            </h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            Automated overdue alerts (₹10/day fine calculation), due reminders, and reservation notices.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" className="btn-secondary" onClick={fetchNotifications} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spin-slow' : ''} /> Refresh
          </button>
          {isStaff && (
            <button type="button" className="btn-primary" onClick={() => setComposeOpen(true)}>
              <Plus size={16} /> Compose Email Notice
            </button>
          )}
        </div>
      </div>

      {statusMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10b981',
          color: '#34d399',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          fontSize: '0.85rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={16} /> {statusMsg}
        </div>
      )}

      {/* Notifications Grid / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <Mail size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
            <div>No notifications currently found.</div>
          </div>
        ) : (
          notifications.map(item => {
            const style = getTypeStyle(item.type);
            const isUnread = item.status !== 'READ';

            return (
              <div
                key={item.id}
                style={{
                  background: isUnread ? 'rgba(30, 41, 59, 0.7)' : 'rgba(15, 23, 42, 0.4)',
                  border: isUnread ? `1.5px solid ${style.border}` : '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '20px',
                      background: style.bg,
                      color: style.color,
                      border: `1px solid ${style.border}`
                    }}>
                      {style.label}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>
                      {item.title}
                    </h4>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> {item.createdAt}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#34d399',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      fontWeight: 700
                    }}>
                      DISPATCHED (SMTP)
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  {item.message}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                  <div>
                    Recipient: <strong>{item.recipientEmail}</strong> (user: @{item.username})
                  </div>
                  {isUnread && (
                    <button
                      type="button"
                      onClick={() => handleMarkRead(item.id)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem' }}
                    >
                      Mark as read ✓
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Compose Email Modal */}
      {composeOpen && (
        <div className="modal-overlay" onClick={() => setComposeOpen(false)}>
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} color="var(--primary)" /> Compose Automated Email Alert
              </h3>
              <button className="close-btn" onClick={() => setComposeOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendNotification} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
              <div>
                <label className="form-label">Patron Username</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Recipient Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  value={formData.recipientEmail}
                  onChange={e => setFormData({ ...formData, recipientEmail: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Notification Type</label>
                <select
                  className="input-field"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="OVERDUE_FINE">Overdue Notice & Fine Calculation (₹10/day)</option>
                  <option value="DUE_REMINDER">Upcoming Due Date Reminder</option>
                  <option value="RESERVATION_READY">Reserved Book Ready For Pickup</option>
                  <option value="BOOK_ISSUED">Book Issue Checkout Confirmation</option>
                  <option value="GENERAL">General Administrative Bulletin</option>
                </select>
              </div>

              <div>
                <label className="form-label">Email Subject / Title</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Overdue Fine Notice for Design Patterns"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Message Body</label>
                <textarea
                  className="input-field"
                  rows={4}
                  placeholder="Enter notice details, calculated fine in ₹ INR, and instructions for the member..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setComposeOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Send size={16} /> Dispatch Email Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
