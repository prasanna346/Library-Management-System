import React, { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';

export default function UserFormModal({ isOpen, onClose, onSave, userToEdit }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'MEMBER',
    fullName: '',
    phone: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    if (userToEdit) {
      setForm(userToEdit);
    } else {
      setForm({
        username: '',
        email: '',
        password: '',
        role: 'MEMBER',
        fullName: '',
        phone: '',
        status: 'ACTIVE'
      });
    }
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="logo-badge" style={{ width: 34, height: 34 }}>
              <Shield size={18} />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              {userToEdit ? 'Update System User' : 'Create New System User'}
            </h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Username *
              </label>
              <input
                type="text"
                name="username"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                value={form.username}
                onChange={handleChange}
                disabled={!!userToEdit}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Password {userToEdit ? '(Leave blank to keep unchanged)' : '*'}
              </label>
              <input
                type="password"
                name="password"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                value={form.password || ''}
                onChange={handleChange}
                required={!userToEdit}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                System Role *
              </label>
              <select
                name="role"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                value={form.role}
                onChange={handleChange}
              >
                <option value="MEMBER">MEMBER</option>
                <option value="LIBRARIAN">LIBRARIAN</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Account Status
              </label>
              <select
                name="status"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                value={form.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {userToEdit ? 'Save Account' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
