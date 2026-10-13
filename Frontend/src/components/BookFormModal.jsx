import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2 } from 'lucide-react';

export default function BookFormModal({ isOpen, onClose, onSave, bookToEdit }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Computer Science',
    totalCopies: 5,
    availableCopies: 5,
    coverUrl: '',
    description: '',
    publisher: '',
    publicationYear: 2024,
    price: 499
  });

  useEffect(() => {
    if (bookToEdit) {
      setForm({ ...bookToEdit, price: bookToEdit.price !== undefined ? bookToEdit.price : 499 });
    } else {
      setForm({
        title: '',
        author: '',
        isbn: `978-${Math.floor(100000000 + Math.random() * 900000000)}`,
        category: 'Computer Science',
        totalCopies: 5,
        availableCopies: 5,
        coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
        description: '',
        publisher: 'Academic Press',
        publicationYear: 2024,
        price: 499
      });
    }
  }, [bookToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      totalCopies: parseInt(form.totalCopies) || 1,
      availableCopies: parseInt(form.availableCopies) || parseInt(form.totalCopies) || 1,
      publicationYear: parseInt(form.publicationYear) || 2024,
      price: parseFloat(form.price) || 0
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="logo-badge" style={{ width: 34, height: 34 }}>
              {bookToEdit ? <Edit2 size={18} /> : <Plus size={18} />}
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              {bookToEdit ? 'Update Book Details' : 'Add New Book to Inventory'}
            </h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Book Title *
              </label>
              <input
                type="text"
                name="title"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                placeholder="e.g. Introduction to Algorithms"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Author Name *
              </label>
              <input
                type="text"
                name="author"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                placeholder="e.g. Thomas H. Cormen"
                value={form.author}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                ISBN Number *
              </label>
              <input
                type="text"
                name="isbn"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                placeholder="e.g. 978-0262033848"
                value={form.isbn}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Category / Genre
              </label>
              <select
                name="category"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                value={form.category}
                onChange={handleChange}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Fiction">Fiction</option>
                <option value="Dystopian Fiction">Dystopian Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Total Stock Copies
              </label>
              <input
                type="number"
                name="totalCopies"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                min="1"
                value={form.totalCopies}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Available Copies
              </label>
              <input
                type="number"
                name="availableCopies"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                min="0"
                value={form.availableCopies}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Publisher
              </label>
              <input
                type="text"
                name="publisher"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                placeholder="e.g. MIT Press"
                value={form.publisher}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Book Cost (₹ INR) *
              </label>
              <input
                type="number"
                name="price"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                placeholder="e.g. 599"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Cover Image URL
              </label>
              <input
                type="text"
                name="coverUrl"
                className="input-field"
                style={{ paddingLeft: '1rem' }}
                placeholder="https://..."
                value={form.coverUrl}
                onChange={handleChange}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Description / Summary
              </label>
              <textarea
                name="description"
                className="input-field"
                style={{ paddingLeft: '1rem', height: '80px', resize: 'vertical' }}
                placeholder="Brief summary of the book content..."
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {bookToEdit ? 'Save Changes' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
