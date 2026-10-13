import React, { useState, useEffect } from 'react';
import { 
  BookOpen, X, Sun, Moon, Coffee, 
  ExternalLink, Bookmark 
} from 'lucide-react';

export default function EBookReaderModal({ book, isOpen, onClose }) {
  const [digitalData, setDigitalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [readerTheme, setReaderTheme] = useState('dark'); // 'dark', 'sepia', 'light'
  const [fontSize, setFontSize] = useState(16); // in px
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (isOpen && book?.id) {
      setLoading(true);
      fetch(`/api/books/${book.id}/digital`)
        .then(res => res.json())
        .then(data => {
          setDigitalData(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setDigitalData({
            title: book.title,
            author: book.author,
            digitalContent: book.digitalContent || `# ${book.title}\n\nBy ${book.author}\n\n## Chapter 1\n\nWelcome to the digital edition of ${book.title}. ${book.description || 'Enjoy reading this digital masterwork from the Central Library collection.'}\n\nDigital texts are accessible 24/7 on all connected devices.`
          });
        });
    }
  }, [isOpen, book]);

  if (!isOpen || !book) return null;

  const themeStyles = {
    dark: {
      background: '#0f172a',
      color: '#e2e8f0',
      headerBg: '#1e293b',
      border: 'rgba(255,255,255,0.1)'
    },
    sepia: {
      background: '#fbf0d9',
      color: '#433422',
      headerBg: '#f2e2be',
      border: '#dfcaa0'
    },
    light: {
      background: '#ffffff',
      color: '#1e293b',
      headerBg: '#f8fafc',
      border: '#e2e8f0'
    }
  };

  const currentTheme = themeStyles[readerTheme];

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '820px',
          height: '720px',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          background: currentTheme.background,
          color: currentTheme.color,
          border: `1.5px solid ${currentTheme.border}`,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
          transition: 'background 0.2s, color 0.2s'
        }}
      >
        {/* Top Control Bar */}
        <div style={{
          padding: '0.85rem 1.5rem',
          background: currentTheme.headerBg,
          borderBottom: `1px solid ${currentTheme.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <BookOpen size={20} color="var(--primary)" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{book.title}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Digital E-Reader • {book.author}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Font Size Adjuster */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(0,0,0,0.1)', padding: '0.2rem 0.5rem', borderRadius: '8px' }}>
              <button
                type="button"
                onClick={() => setFontSize(prev => Math.max(13, prev - 1))}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 800, color: currentTheme.color, padding: '0.2rem 0.4rem' }}
                title="Decrease font size"
              >
                A-
              </button>
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{fontSize}px</span>
              <button
                type="button"
                onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 800, color: currentTheme.color, padding: '0.2rem 0.4rem' }}
                title="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Reading Theme Selector */}
            <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.1)', padding: '0.2rem', borderRadius: '8px' }}>
              <button
                type="button"
                onClick={() => setReaderTheme('dark')}
                style={{
                  background: readerTheme === 'dark' ? '#334155' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.3rem 0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Dark Night Mode"
              >
                <Moon size={14} />
              </button>

              <button
                type="button"
                onClick={() => setReaderTheme('sepia')}
                style={{
                  background: readerTheme === 'sepia' ? '#dfcaa0' : 'transparent',
                  color: '#433422',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.3rem 0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Warm Sepia Mode"
              >
                <Coffee size={14} />
              </button>

              <button
                type="button"
                onClick={() => setReaderTheme('light')}
                style={{
                  background: readerTheme === 'light' ? '#e2e8f0' : 'transparent',
                  color: '#1e293b',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.3rem 0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Crisp Paper Light Mode"
              >
                <Sun size={14} />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={() => setBookmarked(!bookmarked)}
              style={{
                background: bookmarked ? '#10b981' : 'transparent',
                color: bookmarked ? '#fff' : currentTheme.color,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                padding: '0.35rem 0.65rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              <Bookmark size={14} /> {bookmarked ? 'Saved' : 'Bookmark'}
            </button>

            {/* External full archive link */}
            {book.ebookUrl && (
              <a
                href={book.ebookUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#3b82f6',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  fontWeight: 700
                }}
              >
                Full Archive <ExternalLink size={13} />
              </a>
            )}

            <button className="close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Reader Reading Canvas */}
        <div style={{
          flex: 1,
          padding: '2.5rem 3.5rem',
          overflowY: 'auto',
          fontSize: `${fontSize}px`,
          lineHeight: '1.8',
          fontFamily: 'Charter, Georgia, serif',
          maxWidth: '740px',
          margin: '0 auto',
          width: '100%'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: currentTheme.color }}>
              Loading digital edition...
            </div>
          ) : (
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {digitalData?.digitalContent || book.digitalContent || book.description}
            </div>
          )}
        </div>

        {/* Reading Progress Footer */}
        <div style={{
          padding: '0.65rem 1.5rem',
          background: currentTheme.headerBg,
          borderTop: `1px solid ${currentTheme.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          opacity: 0.8
        }}>
          <span>Reading Progress: Chapter 1 (100% of available excerpt)</span>
          <span>Central Library Digital Archive • Offline Mode Supported</span>
        </div>
      </div>
    </div>
  );
}
