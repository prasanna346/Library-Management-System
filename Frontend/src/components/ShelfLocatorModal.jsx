import React, { useState } from 'react';
import { MapPin, X, Navigation, Compass } from 'lucide-react';

export default function ShelfLocatorModal({ book, isOpen, onClose, allBooks = [], onSelectBook }) {
  const [activeFloor, setActiveFloor] = useState(() => {
    if (book?.shelfLocation?.includes('Floor 2')) return 2;
    if (book?.shelfLocation?.includes('Floor 3')) return 3;
    return 1;
  });

  if (!isOpen) return null;

  // Floor layout configuration
  const floors = [
    {
      level: 1,
      name: 'Ground Level (Floor 1)',
      domain: 'Literature, Fiction & Self-Help',
      color: '#10b981',
      racks: [
        { id: 'Rack A', section: 'FIC-02', label: 'Classic Fiction', books: ['To Kill a Mockingbird'] },
        { id: 'Rack B', section: 'GEN-01', label: 'General Non-Fiction', books: [] },
        { id: 'Rack C', section: 'DYS-01', label: 'Dystopian & Sci-Fi', books: ['1984'] },
        { id: 'Rack D', section: 'SLF-03', label: 'Self-Help & Habits', books: ['Atomic Habits'] }
      ]
    },
    {
      level: 2,
      name: 'Second Level (Floor 2)',
      domain: 'Computer Science, Engineering & Mathematics',
      color: '#3b82f6',
      racks: [
        { id: 'Rack A', section: 'CS-01', label: 'Software Architecture', books: ['Clean Code: A Handbook of Agile Software Craftsmanship'] },
        { id: 'Rack B', section: 'CS-01 / CS-02', label: 'Design Patterns & Systems', books: ['Design Patterns: Elements of Reusable Object-Oriented Software', 'The Pragmatic Programmer'] },
        { id: 'Rack C', section: 'ENG-03', label: 'Electronics & Networks', books: [] },
        { id: 'Rack D', section: 'MTH-01', label: 'Discrete Math & Algorithms', books: [] }
      ]
    },
    {
      level: 3,
      name: 'Third Level (Floor 3)',
      domain: 'History, Anthropology & Archival Research',
      color: '#8b5cf6',
      racks: [
        { id: 'Rack A', section: 'HIS-04', label: 'World Civilizations & Humankind', books: ['Sapiens: A Brief History of Humankind'] },
        { id: 'Rack B', section: 'ARC-01', label: 'Ancient Manuscripts & Rare Folios', books: [] },
        { id: 'Rack C', section: 'SOC-02', label: 'Sociology & Global Politics', books: [] }
      ]
    }
  ];

  const currentFloorData = floors.find(f => f.level === activeFloor) || floors[0];
  const targetLocation = book?.shelfLocation || 'Floor 1, Section GEN-01, Rack A, Shelf 1';

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '840px',
          padding: 0,
          overflow: 'hidden',
          border: '1.5px solid rgba(16, 185, 129, 0.4)',
          boxShadow: '0 25px 60px -15px rgba(16, 185, 129, 0.3)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
            }}>
              <Navigation size={22} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                Book Shelf & Physical Location Navigator
              </h3>
              <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.78rem', color: '#6ee7b7' }}>
                Floor Directory, Rack Positioning & Shelf Guidance
              </p>
            </div>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Selected Book Navigation Target Card */}
        {book && (
          <div style={{
            padding: '1rem 1.5rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src={book.coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400'} 
                alt={book.title}
                style={{ width: 36, height: 48, objectFit: 'cover', borderRadius: '4px' }}
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#f8fafc' }}>{book.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>by {book.author}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                background: '#10b981',
                color: '#fff',
                padding: '0.4rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <MapPin size={14} /> {targetLocation}
              </div>
            </div>
          </div>
        )}

        <div style={{ padding: '1.5rem' }}>
          {/* Floor Selector Pills */}
          <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem' }}>
            {floors.map(f => (
              <button
                key={f.level}
                type="button"
                onClick={() => setActiveFloor(f.level)}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: activeFloor === f.level ? `2px solid ${f.color}` : '1px solid var(--border-color)',
                  background: activeFloor === f.level ? `${f.color}20` : 'rgba(15, 23, 42, 0.5)',
                  color: activeFloor === f.level ? '#f8fafc' : 'var(--text-muted)',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div>Floor {f.level}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 500, opacity: 0.8 }}>{f.domain.split(',')[0]}</div>
              </button>
            ))}
          </div>

          {/* Interactive Floor Plan Map */}
          <div style={{
            background: '#090d16',
            borderRadius: '14px',
            border: '1.5px solid var(--border-color)',
            padding: '1.25rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: currentFloorData.color }}>
                {currentFloorData.name} — {currentFloorData.domain}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Entrance / Stairs on East Wing
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {currentFloorData.racks.map(rack => {
                const isTargetRack = book && book.shelfLocation && book.shelfLocation.includes(`Floor ${activeFloor}`) && book.shelfLocation.includes(rack.id);

                return (
                  <div
                    key={rack.id}
                    style={{
                      background: isTargetRack ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isTargetRack ? '2px solid #10b981' : '1px solid var(--border-color)',
                      borderRadius: '10px',
                      padding: '0.85rem',
                      position: 'relative',
                      boxShadow: isTargetRack ? '0 0 15px rgba(16, 185, 129, 0.3)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isTargetRack && (
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '8px',
                        background: '#10b981',
                        color: '#fff',
                        fontSize: '0.65rem',
                        fontWeight: 900,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '10px'
                      }}>
                        TARGET BOOK HERE
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.85rem', color: isTargetRack ? '#34d399' : '#e2e8f0' }}>
                        {rack.id}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        [{rack.section}]
                      </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                      {rack.label}
                    </div>

                    {/* Shelf Rows Representation */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {[1, 2, 3, 4].map(shelfNum => {
                        const isThisShelf = isTargetRack && book.shelfLocation.includes(`Shelf ${shelfNum}`);
                        return (
                          <div
                            key={shelfNum}
                            style={{
                              padding: '0.3rem 0.5rem',
                              borderRadius: '4px',
                              background: isThisShelf ? '#10b981' : 'rgba(255, 255, 255, 0.05)',
                              color: isThisShelf ? '#fff' : 'var(--text-muted)',
                              fontSize: '0.7rem',
                              fontWeight: isThisShelf ? 800 : 500,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <span>Shelf {shelfNum}</span>
                            {isThisShelf && <span>★ {book.title.slice(0, 16)}...</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Turn-by-Turn Wayfinding Guidance */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            padding: '1rem',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <Compass size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: '0.2rem' }}>
                Turn-by-Turn Wayfinding Instructions:
              </div>
              <div style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>
                1. From main library lobby, take elevator or central stairs to <strong>Floor {activeFloor}</strong>.<br />
                2. Enter through the RFID security archway into the main collection wing.<br />
                3. Follow aisle marker signs to the shelf row. Books are cataloged left-to-right by Dewey decimal category.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
