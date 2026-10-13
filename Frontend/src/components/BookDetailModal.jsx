import React, { useState } from 'react';
import { 
  X, BookOpen, User, Tag, Calendar, Building, Hash, 
  CheckCircle2, MapPin, Bookmark, BookText, 
  Navigation 
} from 'lucide-react';

export default function BookDetailModal({ 
  book, 
  isOpen, 
  onClose, 
  onIssue, 
  isMember, 
  onOpenShelfLocator, 
  onOpenReader, 
    onReserveBook 
}) {
  const [reservedSuccess, setReservedSuccess] = useState(false);

  if (!isOpen || !book) return null;

  const isAvailable = book.availableCopies > 0;

  const handleReserve = () => {
    if (onReserveBook) {
      onReserveBook(book);
      setReservedSuccess(true);
      setTimeout(() => setReservedSuccess(false), 3500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content glass-card" 
        style={{ maxWidth: '680px', padding: 0, overflow: 'hidden' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BookOpen className="text-primary" size={22} color="var(--primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              Book Overview & Smart Services
            </h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '1.5rem', marginBottom: '1.25rem' }}>
            {/* Book Cover & Quick Action Badges */}
            <div>
              <img
                src={book.coverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400'}
                alt={book.title}
                style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--border-color)' }}
              />
              <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                <span className={`stock-badge ${isAvailable ? 'available' : 'unavailable'}`}>
                  {isAvailable ? `${book.availableCopies} Available` : 'Out of Stock'}
                </span>
              </div>

              {/* Shelf location pill */}
              <div 
                onClick={() => { if (onOpenShelfLocator) onOpenShelfLocator(book); }}
                style={{
                  marginTop: '0.65rem',
                  padding: '0.45rem',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#34d399',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem',
                  cursor: 'pointer'
                }}
                title="Click to view visual shelf map"
              >
                <MapPin size={13} /> Shelf Map View
              </div>
            </div>

            {/* Book Metadata */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span className="book-category">{book.category}</span>
                {book.borrowCount > 40 && (
                  <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 800 }}>
                    ðŸ”¥ Popular ({book.borrowCount} checkouts)
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0.2rem 0 0.4rem 0' }}>{book.title}</h3>
              
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
                <User size={16} /> {book.author}
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '0.85rem', fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-main)' }}>
                {book.description || 'No detailed summary provided for this publication.'}
              </div>

              {/* Technical Specifications */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Hash size={14} /> <strong>ISBN:</strong> {book.isbn}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building size={14} /> <strong>Publisher:</strong> {book.publisher || 'N/A'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} /> <strong>Year:</strong> {book.publicationYear || 'N/A'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Tag size={14} /> <strong>Total Stock:</strong> {book.totalCopies} copies
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', gridColumn: 'span 2', color: '#10b981', fontWeight: 800, fontSize: '0.95rem' }}>
                  <span>ðŸ’° Book Pricing:</span> <span>â‚¹{(book.price || 499).toLocaleString('en-IN')} INR</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', gridColumn: 'span 2', color: '#93c5fd', fontSize: '0.78rem' }}>
                  <Navigation size={13} /> <strong>Physical Shelf:</strong> {book.shelfLocation || 'Floor 1, Shelf A'}
                </div>
              </div>
            </div>
          </div>

          {/* Reserved Confirmation Alert */}
          {reservedSuccess && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10b981',
              color: '#34d399',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <CheckCircle2 size={16} /> Online reservation queued successfully! Check the Reservations tab.
            </div>
          )}

          {/* Smart Feature Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => { if (onOpenReader) onOpenReader(book); }}
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
            >
              <BookText size={15} color="var(--primary)" /> Read Digital Excerpt
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => { if (onOpenShelfLocator) onOpenShelfLocator(book); }}
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
            >
              <MapPin size={15} color="#10b981" /> Locate on Shelf
            </button>

            {isMember && (
              <button
                type="button"
                className="btn-secondary"
                onClick={handleReserve}
                style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem', borderColor: '#f59e0b', color: '#fbbf24' }}
              >
                <Bookmark size={15} /> Reserve Online
              </button>
            )}
          </div>

          {/* Footer Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
            {isMember && isAvailable && (
              <button
                className="btn-primary"
                onClick={() => {
                  onIssue(book);
                  onClose();
                }}
              >
                <CheckCircle2 size={16} /> Issue Book (if avail)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

