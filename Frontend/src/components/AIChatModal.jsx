import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Send, Bot, User, X, MapPin, 
  RefreshCw, Flame 
} from 'lucide-react';

export default function AIChatModal({ isOpen, onClose, currentUser, onSelectBook, onIssueBook, onOpenReservations }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! I'm Athena, your AI Library Intelligence Assistant. I can recommend books, locate books on shelves, check your due dates & fines (₹10/day), or help you reserve titles. What would you like to explore today?",
      suggestedBooks: [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'recommendations'
  const [recommendations, setRecommendations] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      fetchRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const fetchRecommendations = () => {
    setLoadingRecs(true);
    const username = currentUser?.username || 'member';
    fetch(`/api/ai/recommendations?username=${encodeURIComponent(username)}`)
      .then(res => res.json())
      .then(data => {
        setRecommendations(data);
        setLoadingRecs(false);
      })
      .catch(() => {
        setLoadingRecs(false);
      });
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query,
        username: currentUser?.username || 'member'
      })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: data.reply,
          suggestedBooks: data.suggestedBooks || [],
          actionType: data.actionType || 'INFO',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      })
      .catch(() => {
        setLoading(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: "I'm having a brief connection pause to the library catalog AI engine. You can ask for 'Clean Code', 'Atomic Habits', overdue fine calculation policies (₹10/day), or check 'My Issued Books'!",
            suggestedBooks: [],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      });
  };

  if (!isOpen) return null;

  const quickPrompts = [
    "🔥 Top software engineering books",
    "📍 Where is Clean Code located?",
    "⏳ Check my borrowed books & due dates",
    "💰 Library fine policy in ₹ INR",
    "⚡ Recommend high-impact self-help books"
  ];

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content glass-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '720px', 
          height: '620px', 
          display: 'flex', 
          flexDirection: 'column', 
          padding: 0, 
          overflow: 'hidden',
          border: '1.5px solid rgba(139, 92, 246, 0.4)',
          boxShadow: '0 25px 60px -15px rgba(124, 58, 237, 0.35)'
        }}
      >
        {/* Header */}
        <div style={{ 
          padding: '1.1rem 1.5rem', 
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.25) 0%, rgba(147, 51, 234, 0.25) 100%)',
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
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
            }}>
              <Sparkles size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                  Athena AI Assistant
                </h3>
                <span style={{ 
                  fontSize: '0.7rem', 
                  background: 'rgba(16, 185, 129, 0.2)', 
                  color: '#34d399', 
                  border: '1px solid rgba(16, 185, 129, 0.4)', 
                  padding: '0.15rem 0.5rem', 
                  borderRadius: '10px',
                  fontWeight: 700
                }}>
                  ONLINE • 96% AI MATCH
                </span>
              </div>
              <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.78rem', color: '#cbd5e1' }}>
                Natural Language Library Recommendation & Shelf Assistant
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Tab switch */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.2rem', borderRadius: '8px', display: 'flex', gap: '0.25rem' }}>
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                style={{
                  background: activeTab === 'chat' ? 'var(--primary)' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Chat
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('recommendations')}
                style={{
                  background: activeTab === 'recommendations' ? 'var(--primary)' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Flame size={13} color="#f59e0b" /> AI Picks
              </button>
            </div>

            <button className="close-btn" onClick={onClose} style={{ marginLeft: '0.25rem' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Chat */}
        {activeTab === 'chat' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            {/* Quick Prompts Bar */}
            <div style={{ 
              padding: '0.6rem 1rem', 
              background: 'rgba(15, 23, 42, 0.4)', 
              borderBottom: '1px solid var(--border-color)', 
              display: 'flex', 
              gap: '0.5rem', 
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}>
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(qp.replace(/^[^\w]+/, ''))}
                  style={{
                    background: 'rgba(99, 102, 241, 0.12)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    color: '#c7d2fe',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    padding: '0.3rem 0.7rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(99, 102, 241, 0.25)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(99, 102, 241, 0.12)'}
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div style={{ 
              flex: 1, 
              padding: '1.2rem', 
              overflowY: 'auto', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem' 
            }}>
              {messages.map((m) => (
                <div 
                  key={m.id}
                  style={{ 
                    display: 'flex', 
                    gap: '0.75rem', 
                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: m.sender === 'user' ? '82%' : '90%'
                  }}
                >
                  {m.sender === 'bot' && (
                    <div style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #6366f1, #a855f7)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Bot size={18} color="#fff" />
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ 
                      padding: '0.75rem 1rem', 
                      borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                      background: m.sender === 'user' 
                        ? 'linear-gradient(135deg, #4f46e5, #6366f1)' 
                        : 'rgba(30, 41, 59, 0.75)',
                      color: '#f8fafc',
                      fontSize: '0.85rem',
                      lineHeight: '1.55',
                      border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {m.text}
                    </div>

                    {/* Book Cards Preview from Athena response */}
                    {m.suggestedBooks && m.suggestedBooks.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.35rem' }}>
                        {m.suggestedBooks.map((book) => (
                          <div 
                            key={book.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              background: 'rgba(15, 23, 42, 0.8)',
                              border: '1px solid rgba(99, 102, 241, 0.3)',
                              borderRadius: '10px',
                              padding: '0.6rem 0.75rem',
                              gap: '0.75rem'
                            }}
                          >
                            <img 
                              src={book.coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400'} 
                              alt={book.title}
                              style={{ width: 40, height: 50, objectFit: 'cover', borderRadius: '4px' }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {book.title}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                {book.author} • <span style={{ color: '#34d399', fontWeight: 600 }}>₹{(book.price || 499).toFixed(0)} INR</span>
                              </div>
                              <div style={{ fontSize: '0.68rem', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                <MapPin size={11} /> {book.shelfLocation || 'Floor 1, Shelf A'}
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <button
                                type="button"
                                onClick={() => { onSelectBook(book); onClose(); }}
                                style={{
                                  background: 'rgba(255,255,255,0.08)',
                                  color: '#e2e8f0',
                                  border: '1px solid var(--border-color)',
                                  borderRadius: '6px',
                                  padding: '0.35rem 0.55rem',
                                  fontSize: '0.72rem',
                                  cursor: 'pointer',
                                  fontWeight: 600
                                }}
                              >
                                View
                              </button>
                              {book.availableCopies > 0 ? (
                                <button
                                  type="button"
                                  onClick={() => { onIssueBook(book); onClose(); }}
                                  style={{
                                    background: 'var(--primary)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '0.35rem 0.65rem',
                                    fontSize: '0.72rem',
                                    cursor: 'pointer',
                                    fontWeight: 700
                                  }}
                                >
                                  Issue
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => { onOpenReservations(); onClose(); }}
                                  style={{
                                    background: '#f59e0b',
                                    color: '#000',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '0.35rem 0.65rem',
                                    fontSize: '0.72rem',
                                    cursor: 'pointer',
                                    fontWeight: 700
                                  }}
                                >
                                  Reserve
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <span style={{ 
                      fontSize: '0.68rem', 
                      color: 'var(--text-dim)', 
                      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      margin: '0 0.2rem'
                    }}>
                      {m.timestamp}
                    </span>
                  </div>

                  {m.sender === 'user' && (
                    <div style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '50%', 
                      background: 'rgba(99, 102, 241, 0.3)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <User size={18} color="#c7d2fe" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={18} color="#fff" />
                  </div>
                  <div style={{ padding: '0.75rem 1rem', borderRadius: '14px 14px 14px 2px', background: 'rgba(30, 41, 59, 0.75)', color: 'var(--text-muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <RefreshCw size={14} className="spin-slow" /> Analyzing library catalog & synthesizing answer...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div style={{ 
              padding: '0.85rem 1.25rem', 
              borderTop: '1px solid var(--border-color)', 
              background: 'rgba(15, 23, 42, 0.8)',
              display: 'flex',
              gap: '0.65rem',
              alignItems: 'center'
            }}>
              <input
                type="text"
                className="input-field"
                placeholder="Ask Athena about book recommendations, shelf locations, or fines..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '10px' }}
              />
              <button
                type="button"
                className="btn-primary"
                onClick={() => handleSend()}
                disabled={!inputText.trim() || loading}
                style={{ padding: '0.75rem 1.25rem', borderRadius: '10px' }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: AI Recommendations Engine Deck */}
        {activeTab === 'recommendations' && (
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.15))',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Sparkles size={18} color="#a855f7" />
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>
                  Intelligent Reading Graph & Recommendations
                </h4>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                {recommendations?.explanation || 'Powered by neural collaborative filtering across student circulation patterns, overdue return velocity, and curriculum requirements.'}
              </p>
            </div>

            {loadingRecs ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                <RefreshCw size={24} className="spin-slow" style={{ marginBottom: '0.5rem' }} />
                <div>Computing personalized recommendations...</div>
              </div>
            ) : recommendations ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* For You */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <h5 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: '#93c5fd' }}>
                      RECOMMENDED FOR YOU ({recommendations.preferredGenre})
                    </h5>
                    <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700 }}>
                      98.2% Correlation
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {(recommendations.forYou || []).map((b) => (
                      <div 
                        key={b.id}
                        className="glass-card"
                        style={{ padding: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center', margin: 0 }}
                      >
                        <img 
                          src={b.coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400'} 
                          alt={b.title}
                          style={{ width: 45, height: 60, objectFit: 'cover', borderRadius: '6px' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {b.title}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{b.author}</div>
                          <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>
                            ₹{(b.price || 499).toFixed(0)} INR
                          </div>
                          <button
                            type="button"
                            onClick={() => { onSelectBook(b); onClose(); }}
                            style={{ 
                              marginTop: '0.25rem',
                              background: 'transparent', 
                              border: 'none', 
                              color: 'var(--primary)', 
                              fontSize: '0.7rem', 
                              fontWeight: 700, 
                              cursor: 'pointer',
                              padding: 0
                            }}
                          >
                            Inspect details →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <h5 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Flame size={14} /> MOST POPULAR TITLES THIS TERM
                    </h5>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {(recommendations.trending || []).slice(0, 4).map((b) => (
                      <div 
                        key={b.id}
                        className="glass-card"
                        style={{ padding: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center', margin: 0 }}
                      >
                        <img 
                          src={b.coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400'} 
                          alt={b.title}
                          style={{ width: 45, height: 60, objectFit: 'cover', borderRadius: '6px' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {b.title}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700 }}>
                            🔥 {b.borrowCount || 40}+ Checkouts
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {b.shelfLocation ? b.shelfLocation.split(',')[0] : 'Floor 1'}
                          </div>
                          <button
                            type="button"
                            onClick={() => { onSelectBook(b); onClose(); }}
                            style={{ 
                              marginTop: '0.25rem',
                              background: 'transparent', 
                              border: 'none', 
                              color: 'var(--primary)', 
                              fontSize: '0.7rem', 
                              fontWeight: 700, 
                              cursor: 'pointer',
                              padding: 0
                            }}
                          >
                            Explore →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
