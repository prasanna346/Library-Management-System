import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import BookDetailModal from './components/BookDetailModal';
import BookFormModal from './components/BookFormModal';
import UserFormModal from './components/UserFormModal';
import ReportsView from './components/ReportsView';
import SystemLogsView from './components/SystemLogsView';
import BackupView from './components/BackupView';
import AIChatModal from './components/AIChatModal';
import ShelfLocatorModal from './components/ShelfLocatorModal';
import EBookReaderModal from './components/EBookReaderModal';
import ReservationsView from './components/ReservationsView';
import NotificationsView from './components/NotificationsView';
import {
  Search, BookOpen, Plus, Edit2, Trash2, CheckCircle2, RefreshCw,
  User, Shield, BookCheck, Filter, Sparkles, MapPin, 
  BookText
} from 'lucide-react';

// Default Fallback Mock Seed Data
const INITIAL_BOOKS = [
  {
    id: 1,
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    category: 'Computer Science',
    totalCopies: 5,
    availableCopies: 3,
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
    description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees.',
    publisher: 'Prentice Hall',
    publicationYear: 2008,
    price: 599.00,
    shelfLocation: 'Floor 2, Section CS-01, Rack A, Shelf 3',
    borrowCount: 65,
    digitalContent: '# Chapter 1: Clean Code\n\nYou are reading this book for two reasons: First, you are a programmer. Second, you want to be a better programmer. Good. We need better programmers.\n\nCode will never disappear. Clean code is simple and direct. It never obscures the designer\'s intent.'
  },
  {
    id: 2,
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    isbn: '978-0201633610',
    category: 'Computer Science',
    totalCopies: 4,
    availableCopies: 2,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    description: 'Captures solutions to common software design problems in object-oriented programming.',
    publisher: 'Addison-Wesley',
    publicationYear: 1994,
    price: 649.00,
    shelfLocation: 'Floor 2, Section CS-01, Rack B, Shelf 4',
    borrowCount: 48,
    digitalContent: '# Chapter 1: Introduction\n\nDesigning object-oriented software is hard, and designing reusable object-oriented software is even harder.\n\nExpert designers reuse solutions that have worked for them in the past.'
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0061120084',
    category: 'Fiction',
    totalCopies: 6,
    availableCopies: 5,
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.',
    publisher: 'J. B. Lippincott & Co.',
    publicationYear: 1960,
    price: 399.00,
    shelfLocation: 'Floor 1, Section FIC-02, Rack A, Shelf 1',
    borrowCount: 32,
    digitalContent: '# Chapter 1\n\nWhen he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, his fears of never being able to play football were assuaged.'
  },
  {
    id: 4,
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    category: 'Dystopian Fiction',
    totalCopies: 8,
    availableCopies: 6,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    description: 'A chilling prophecy about the future and totalitarian rule in a world of total surveillance.',
    publisher: 'Secker & Warburg',
    publicationYear: 1949,
    price: 299.00,
    shelfLocation: 'Floor 1, Section DYS-01, Rack C, Shelf 2',
    borrowCount: 45,
    digitalContent: '# Part One: Chapter I\n\nIt was a bright cold day in April, and the clocks were striking thirteen. Winston Smith slipped quickly through the glass doors of Victory Mansions.'
  },
  {
    id: 5,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    isbn: '978-0062316097',
    category: 'History',
    totalCopies: 5,
    availableCopies: 4,
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
    description: '100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens.',
    publisher: 'Harper',
    publicationYear: 2014,
    price: 499.00,
    shelfLocation: 'Floor 3, Section HIS-04, Rack A, Shelf 5',
    borrowCount: 58,
    digitalContent: '# Part One: The Cognitive Revolution\n\n100,000 years ago, at least six different species of humans inhabited Planet Earth. Today, only one remains: Homo sapiens. Rules the world.'
  },
  {
    id: 6,
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '978-0735211292',
    category: 'Self-Help',
    totalCopies: 7,
    availableCopies: 5,
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.',
    publisher: 'Avery',
    publicationYear: 2018,
    price: 450.00,
    shelfLocation: 'Floor 1, Section SLF-03, Rack D, Shelf 2',
    borrowCount: 74,
    digitalContent: '# The Fundamentals\n\nChanges that seem small and unimportant at first will compound into remarkable results if you\'re willing to stick with them for years.\n\nYou do not rise to the level of your goals. You fall to the level of your systems.'
  }
];

const INITIAL_USERS = [
  { id: 1, username: 'prasanna', email: 'prasanna@library.org', role: 'ADMIN', fullName: 'Prasanna (System Administrator)', phone: '+91-9876543210', status: 'ACTIVE' },
  { id: 2, username: 'admin', email: 'admin@library.org', role: 'ADMIN', fullName: 'System Administrator', phone: '+91-9876543200', status: 'ACTIVE' },
  { id: 3, username: 'librarian', email: 'librarian@library.org', role: 'LIBRARIAN', fullName: 'Sarah Jenkins (Head Librarian)', phone: '+91-9876543201', status: 'ACTIVE' },
  { id: 4, username: 'member', email: 'member@gmail.com', role: 'MEMBER', fullName: 'Alex Morgan', phone: '+91-9876543202', status: 'ACTIVE' },
  { id: 5, username: 'john_doe', email: 'john@gmail.com', role: 'MEMBER', fullName: 'John Doe', phone: '+91-9876543203', status: 'ACTIVE' }
];

const INITIAL_ISSUED = [
  {
    id: 1,
    bookId: 1,
    bookTitle: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    bookIsbn: '978-0132350884',
    username: 'member',
    userFullName: 'Alex Morgan',
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    status: 'ISSUED',
    fineAmount: 0.0
  },
  {
    id: 2,
    bookId: 2,
    bookTitle: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    bookIsbn: '978-0201633610',
    username: 'john_doe',
    userFullName: 'John Doe',
    issueDate: new Date(Date.now() - 20 * 86400000).toISOString().slice(0, 10),
    dueDate: new Date(Date.now() - 5 * 86400000).toISOString().slice(0, 10),
    status: 'ISSUED',
    fineAmount: 50.0
  }
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lms_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null;
  });
  
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('lms_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u.role === 'ADMIN') return 'users-admin';
        if (u.role === 'LIBRARIAN') return 'manage-books';
      } catch (e) {}
    }
    return 'catalog';
  });
  
  // Data State
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [issuedBooks, setIssuedBooks] = useState(INITIAL_ISSUED);
  const [logs, setLogs] = useState([
    { id: 1, timestamp: new Date().toLocaleString(), username: 'System', role: 'SYSTEM', action: 'INIT', details: 'Library Management System initialized with MySQL persistence.' },
    { id: 2, timestamp: new Date().toLocaleString(), username: 'prasanna', role: 'ADMIN', action: 'STARTUP', details: 'System Administrator active with full privileges.' }
  ]);

  // Filters & Modals State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [availableOnlyFilter, setAvailableOnlyFilter] = useState(false);
  
  const [authModalOpen, setAuthModalOpen] = useState(() => {
    const saved = localStorage.getItem('lms_user');
    return !saved;
  });
  const [selectedBookForView, setSelectedBookForView] = useState(null);
  
  const [bookFormOpen, setBookFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Smart Feature Modals
  const [aiChatOpen, setAiChatOpen] = useState(false);
    const [shelfLocatorOpen, setShelfLocatorOpen] = useState(false);
  const [ebookReaderOpen, setEbookReaderOpen] = useState(false);
  const [selectedBookForFeature, setSelectedBookForFeature] = useState(null);

  const [notification, setNotification] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch live backend data
  const refreshAllData = () => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setBooks(data);
      })
      .catch(() => {});

    fetch('/api/issued-books')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setIssuedBooks(data);
      })
      .catch(() => {});

    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setUsers(data);
      })
      .catch(() => {});

    fetch('/api/logs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setLogs(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const showNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4500);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('lms_user', JSON.stringify(userData));
    showNotify(`Welcome back, ${userData.fullName || userData.username}! Logged in as ${userData.role}.`);
    
    if (userData.role === 'ADMIN') setActiveTab('users-admin');
    else if (userData.role === 'LIBRARIAN') setActiveTab('manage-books');
    else setActiveTab('catalog');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
    setActiveTab('catalog');
    setAuthModalOpen(true);
    showNotify('Logged out successfully.');
  };

  // --- MEMBER FUNCTIONS ---
  const handleIssueBook = (book) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (book.availableCopies <= 0) {
      alert('Sorry, no physical copies currently available. You can reserve this book online!');
      return;
    }

    const alreadyIssued = issuedBooks.find(i => i.bookId === book.id && i.username === user.username && i.status === 'ISSUED');
    if (alreadyIssued) {
      alert('You already have an active checkout for this book!');
      return;
    }

    fetch('/api/books/issue', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-User-Name': user.username
      },
      body: JSON.stringify({ bookId: book.id, username: user.username })
    })
      .then(res => res.json())
      .then(savedIssue => {
        refreshAllData();
      })
      .catch(() => {});

    setBooks(prev => prev.map(b => b.id === book.id ? { ...b, availableCopies: b.availableCopies - 1, borrowCount: (b.borrowCount || 0) + 1 } : b));
    
    const newIssue = {
      id: Date.now(),
      bookId: book.id,
      bookTitle: book.title,
      bookIsbn: book.isbn,
      username: user.username,
      userFullName: user.fullName || user.username,
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      status: 'ISSUED',
      fineAmount: 0.0
    };

    setIssuedBooks(prev => [newIssue, ...prev]);

    showNotify(`Book '${book.title}' successfully issued! Return due on ${newIssue.dueDate}.`);
  };

  const handleRenewBook = (issueId) => {
    fetch('/api/books/renew', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issueId })
    })
      .then(() => refreshAllData())
      .catch(() => {});

    setIssuedBooks(prev => prev.map(item => {
      if (item.id === issueId) {
        const currentDue = new Date(item.dueDate);
        const newDue = new Date(currentDue.getTime() + 14 * 86400000).toISOString().slice(0, 10);
        showNotify(`Renewal granted! Extended due date to ${newDue}.`);
        return { ...item, dueDate: newDue };
      }
      return item;
    }));
  };

  const handleReserveBook = (book) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    fetch('/api/reservations', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-User-Name': user.username
      },
      body: JSON.stringify({
        bookId: book.id,
        username: user.username,
        notes: 'Reserved via Online Web Portal'
      })
    })
      .then(res => res.json())
      .then(data => {
        showNotify(`Online reservation queued for '${book.title}'! Priority Status: ${data.status || 'PENDING'}.`);
      })
      .catch(() => {
        showNotify(`Reservation recorded for '${book.title}'.`);
      });
  };

  // --- LIBRARIAN / ADMIN BOOK MANAGEMENT ---
  const handleSaveBook = (bookData) => {
    if (editingBook) {
      fetch(`/api/books/${editingBook.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Name': user?.username || 'admin'
        },
        body: JSON.stringify(bookData)
      })
        .then(() => refreshAllData())
        .catch(() => {});

      setBooks(prev => prev.map(b => b.id === editingBook.id ? { ...bookData, id: editingBook.id } : b));
      showNotify(`Updated '${bookData.title}' details.`);
    } else {
      const newBook = { ...bookData, id: Date.now() };
      fetch('/api/books', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Name': user?.username || 'admin'
        },
        body: JSON.stringify(newBook)
      })
        .then(() => refreshAllData())
        .catch(() => {});

      setBooks(prev => [newBook, ...prev]);
      showNotify(`Added '${bookData.title}' to library catalog.`);
    }
  };

  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book from inventory?')) {
      fetch(`/api/books/${id}`, { 
        method: 'DELETE',
        headers: { 'X-User-Name': user?.username || 'admin' }
      })
        .then(() => refreshAllData())
        .catch(() => {});

      setBooks(prev => prev.filter(b => b.id !== id));
      showNotify('Book removed from library database.');
    }
  };

  const handleReturnBook = (issueId) => {
    fetch('/api/books/return', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-User-Name': user?.username || 'librarian'
      },
      body: JSON.stringify({ issueId })
    })
      .then(res => res.json())
      .then(data => {
        refreshAllData();
        const fineText = data.fine > 0 ? ` Overdue fine assessed: ₹${data.fine.toFixed(2)} INR.` : ' No fine due.';
        showNotify(`Book returned successfully!${fineText}`);
      })
      .catch(() => {
        showNotify('Book marked as returned!');
        refreshAllData();
      });
  };

  // --- ADMIN USER MANAGEMENT ---
  const handleSaveUser = (userData) => {
    if (editingUser) {
      fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Name': user?.username || 'admin'
        },
        body: JSON.stringify(userData)
      })
        .then(() => refreshAllData())
        .catch(() => {});

      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...userData, id: editingUser.id } : u));
      showNotify(`User '${userData.username}' updated.`);
    } else {
      const newUser = { ...userData, id: Date.now() };
      fetch('/api/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Name': user?.username || 'admin'
        },
        body: JSON.stringify(newUser)
      })
        .then(() => refreshAllData())
        .catch(() => {});

      setUsers(prev => [newUser, ...prev]);
      showNotify(`New user '${userData.username}' created.`);
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`/api/users/${id}`, { 
        method: 'DELETE',
        headers: { 'X-User-Name': user?.username || 'admin' }
      })
        .then(() => refreshAllData())
        .catch(() => {});

      setUsers(prev => prev.filter(u => u.id !== id));
      showNotify('User account removed.');
    }
  };

  // Filtered books
  const filteredBooks = books.filter(b => {
    const matchesQuery = (
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isbn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesCategory = selectedCategory === 'ALL' || b.category === selectedCategory;
    const matchesAvailability = !availableOnlyFilter || b.availableCopies > 0;
    return matchesQuery && matchesCategory && matchesAvailability;
  });

  const categories = ['ALL', ...Array.from(new Set(books.map(b => b.category)))];
  const userIssuedList = user ? issuedBooks.filter(i => i.username === user.username) : [];

  return (
    <div className="app-container">
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenAIChat={() => setAiChatOpen(true)}
              />

      <main className="main-content">
        {/* Toast Notification Banner */}
        {notification && (
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: 'white',
            padding: '0.85rem 1.25rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-glow)',
            fontWeight: 600,
            animation: 'fadeIn 0.3s ease'
          }}>
            <CheckCircle2 size={20} />
            <span>{notification}</span>
          </div>
        )}

        {/* 1. CATALOG SEARCH & MEMBER FUNCTIONS */}
        {activeTab === 'catalog' && (
          <div>
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Explore Library Catalog</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Search books by title, author, category, or ISBN. Check shelf location, read digital excerpts, and issue books.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={() => setAiChatOpen(true)}
                    style={{ borderColor: '#8b5cf6', color: '#c4b5fd' }}
                  >
                    <Sparkles size={16} /> AI Recommendations
                  </button>
                  {(user?.role === 'LIBRARIAN' || user?.role === 'ADMIN') && (
                    <button className="btn-primary" onClick={() => { setEditingBook(null); setBookFormOpen(true); }}>
                      <Plus size={18} /> Add New Book
                    </button>
                  )}
                </div>
              </div>

              {/* Search & Filter Controls */}
              <div className="search-bar-container">
                <div className="search-input-wrapper">
                  <Search size={18} />
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Search by Title, Author, Category, or ISBN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <select
                  className="input-field"
                  style={{ width: 'auto', paddingLeft: '1rem' }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'ALL' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>

                <button
                  className={`btn-secondary ${availableOnlyFilter ? 'active' : ''}`}
                  onClick={() => setAvailableOnlyFilter(!availableOnlyFilter)}
                  style={{ background: availableOnlyFilter ? 'var(--primary-light)' : undefined, borderColor: availableOnlyFilter ? 'var(--primary)' : undefined }}
                >
                  <Filter size={16} /> Available Only
                </button>
              </div>
            </div>

            {/* Books Grid */}
            <div className="books-grid">
              {filteredBooks.length === 0 ? (
                <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                  <BookOpen size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
                  <h3>No matching books found</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search query or filter settings.</p>
                </div>
              ) : (
                filteredBooks.map(book => (
                  <div className="book-card" key={book.id}>
                    <img
                      src={book.coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400'}
                      alt={book.title}
                      className="book-cover"
                    />
                    <div className="book-info">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="book-category">{book.category}</span>
                        {book.borrowCount > 45 && (
                          <span style={{ fontSize: '0.68rem', color: '#f59e0b', fontWeight: 800 }}>
                            ðŸ”¥ {book.borrowCount} Checkouts
                          </span>
                        )}
                      </div>

                      <h4 className="book-title">{book.title}</h4>
                      <div className="book-author">by {book.author}</div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.35rem 0' }}>
                        <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.88rem' }}>
                          ₹{(book.price || 499).toLocaleString('en-IN')} INR
                        </div>
                        <div 
                          onClick={() => { setSelectedBookForFeature(book); setShelfLocatorOpen(true); }}
                          style={{ fontSize: '0.7rem', color: '#93c5fd', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                          title="Click to view shelf map"
                        >
                          <MapPin size={11} /> {book.shelfLocation ? book.shelfLocation.split(',')[0] : 'Floor 1'}
                        </div>
                      </div>

                      <div className="book-footer">
                        <span className={`stock-badge ${book.availableCopies > 0 ? 'available' : 'unavailable'}`}>
                          {book.availableCopies > 0 ? `${book.availableCopies} available` : 'Out of Stock'}
                        </span>

                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                          <button
                            className="btn-secondary"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                            onClick={() => setSelectedBookForView(book)}
                          >
                            Details
                          </button>
                          
                          <button
                            className="btn-secondary"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderColor: 'rgba(99,102,241,0.3)' }}
                            onClick={() => { setSelectedBookForFeature(book); setEbookReaderOpen(true); }}
                            title="Read digital excerpt"
                          >
                            <BookText size={13} color="var(--primary)" /> Read
                          </button>

                          {book.availableCopies > 0 ? (
                            <button
                              className="btn-primary"
                              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                              onClick={() => handleIssueBook(book)}
                            >
                              Issue
                            </button>
                          ) : (
                            <button
                              className="btn-secondary"
                              style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderColor: '#f59e0b', color: '#fbbf24' }}
                              onClick={() => handleReserveBook(book)}
                              title="Reserve copy"
                            >
                              Reserve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 2. MEMBER'S ISSUED BOOKS */}
        {activeTab === 'my-issued' && (
          <div className="glass-card">
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookCheck size={22} color="var(--primary)" /> My Issued Books & Due Trackers
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Track books issued to your account, due dates, fines (₹10/day overdue), and execute online renewals.
            </p>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>ISBN</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Fine Tracker</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userIssuedList.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        You currently have no books issued. Browse the catalog to issue a book!
                      </td>
                    </tr>
                  ) : (
                    userIssuedList.map(item => {
                      const isOverdue = item.status === 'ISSUED' && new Date(item.dueDate) < new Date();
                      return (
                        <tr key={item.id}>
                          <td><strong>{item.bookTitle}</strong></td>
                          <td><code>{item.bookIsbn}</code></td>
                          <td>{item.issueDate}</td>
                          <td style={{ color: isOverdue ? '#f87171' : undefined, fontWeight: isOverdue ? 700 : 400 }}>
                            {item.dueDate}
                          </td>
                          <td>
                            <span className={`stock-badge ${item.status === 'ISSUED' ? 'available' : 'unavailable'}`}>
                              {isOverdue ? 'OVERDUE' : item.status}
                            </span>
                          </td>
                          <td>
                            {item.fineAmount > 0 || isOverdue ? (
                              <span style={{ color: '#f59e0b', fontWeight: 700 }}>₹{(item.fineAmount || 0).toFixed(2)} INR</span>
                            ) : (
                              <span style={{ color: 'var(--text-muted)' }}>₹0.00</span>
                            )}
                          </td>
                          <td>
                            {item.status === 'ISSUED' && (
                              <button
                                className="btn-secondary"
                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                                onClick={() => handleRenewBook(item.id)}
                              >
                                <RefreshCw size={14} /> Renew Online (+14 days)
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ONLINE BOOK RESERVATIONS */}
        {activeTab === 'reservations' && (
          <ReservationsView 
            currentUser={user} 
            onNavigateTab={setActiveTab} 
          />
        )}

        {/* 4. EMAIL NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <NotificationsView 
            currentUser={user} 
          />
        )}

        
        {/* 6. LIBRARIAN & ADMIN BOOK INVENTORY CONTROL */}
        {activeTab === 'manage-books' && (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={22} color="var(--primary)" /> Librarian Book Inventory Master
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Add new books, edit stock details, shelf positioning, and purge records.
                </p>
              </div>

              <button className="btn-primary" onClick={() => { setEditingBook(null); setBookFormOpen(true); }}>
                <Plus size={18} /> Add New Book
              </button>
            </div>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Title & Author</th>
                    <th>Category</th>
                    <th>ISBN</th>
                    <th>Cost (₹ INR)</th>
                    <th>Copies (Avail / Total)</th>
                    <th>Shelf Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map(b => (
                    <tr key={b.id}>
                      <td>
                        <strong>{b.title}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.author}</div>
                      </td>
                      <td><span className="book-category">{b.category}</span></td>
                      <td><code>{b.isbn}</code></td>
                      <td>
                        <strong style={{ color: '#10b981' }}>₹{(b.price || 499).toLocaleString('en-IN')}</strong>
                      </td>
                      <td>
                        <strong>{b.availableCopies}</strong> / {b.totalCopies}
                      </td>
                      <td style={{ fontSize: '0.78rem', color: '#93c5fd' }}>
                        {b.shelfLocation || 'Floor 1, Shelf A'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            className="btn-secondary"
                            style={{ padding: '0.35rem 0.6rem' }}
                            onClick={() => { setEditingBook(b); setBookFormOpen(true); }}
                            title="Edit Book"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            className="btn-danger"
                            style={{ padding: '0.35rem 0.6rem' }}
                            onClick={() => handleDeleteBook(b.id)}
                            title="Remove Book"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. LIBRARIAN MEMBERS MANAGEMENT */}
        {activeTab === 'members' && (
          <div className="glass-card">
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={22} color="var(--primary)" /> Manage Library Members & Active Borrowers
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Process returns, inspect member borrowing accounts, and check fine statuses.
            </p>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Member Name</th>
                    <th>Book Issued</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Process Return</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks.map(item => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.userFullName || item.username}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>@{item.username}</div>
                      </td>
                      <td>{item.bookTitle}</td>
                      <td>{item.issueDate}</td>
                      <td>{item.dueDate}</td>
                      <td>
                        <span className={`stock-badge ${item.status === 'ISSUED' ? 'available' : 'unavailable'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.status === 'ISSUED' ? (
                          <button
                            className="btn-primary"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                            onClick={() => handleReturnBook(item.id)}
                          >
                            <CheckCircle2 size={14} /> Process Return
                          </button>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Returned ({item.returnDate})</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 8. ADMIN USER MANAGEMENT */}
        {activeTab === 'users-admin' && (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={22} color="var(--primary)" /> Role-Based User Access Management
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Create system accounts, assign roles (Member, Librarian, Admin), and update user status.
                </p>
              </div>

              <button className="btn-primary" onClick={() => { setEditingUser(null); setUserFormOpen(true); }}>
                <Plus size={18} /> Create New User
              </button>
            </div>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Username & Name</th>
                    <th>Email Address</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>
                        <strong>{u.fullName || u.username}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>@{u.username}</div>
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`role-badge ${u.role.toLowerCase()}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>{u.phone || 'N/A'}</td>
                      <td>
                        <span className={`stock-badge ${u.status === 'ACTIVE' ? 'available' : 'unavailable'}`}>
                          {u.status || 'ACTIVE'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            className="btn-secondary"
                            style={{ padding: '0.35rem 0.6rem' }}
                            onClick={() => { setEditingUser(u); setUserFormOpen(true); }}
                            title="Edit User"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            className="btn-danger"
                            style={{ padding: '0.35rem 0.6rem' }}
                            onClick={() => handleDeleteUser(u.id)}
                            title="Delete User"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. REPORTS & ADVANCED ANALYTICS */}
        {activeTab === 'reports' && (
          <ReportsView books={books} issuedBooks={issuedBooks} />
        )}

        {/* 10. SYSTEM AUDIT LOGS */}
        {activeTab === 'logs' && (
          <SystemLogsView logs={logs} />
        )}

        {/* 11. BACKUP & RESTORE */}
        {activeTab === 'backup' && (
          <BackupView
            books={books}
            users={users}
            issuedBooks={issuedBooks}
            logs={logs}
            onRestoreSuccess={(data) => {
              if (data.books) setBooks(data.books);
              if (data.users) setUsers(data.users);
              if (data.issuedBooks) setIssuedBooks(data.issuedBooks);
              if (data.logs) setLogs(data.logs);
              showNotify('System data state successfully restored from snapshot!');
            }}
          />
        )}
      </main>

      {/* Floating Athena AI Assistant Button */}
      <button
        type="button"
        onClick={() => setAiChatOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff',
          border: 'none',
          borderRadius: '50px',
          padding: '0.75rem 1.25rem',
          boxShadow: '0 8px 25px rgba(99, 102, 241, 0.45)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontWeight: 800,
          fontSize: '0.88rem',
          transition: 'all 0.2s',
          animation: 'pulse 2.5s infinite'
        }}
        title="Open Athena AI Assistant"
      >
        <Sparkles size={18} />
        <span>Ask AI Assistant</span>
      </button>

      {/* MODALS */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <BookDetailModal
        book={selectedBookForView}
        isOpen={!!selectedBookForView}
        onClose={() => setSelectedBookForView(null)}
        onIssue={handleIssueBook}
        isMember={user?.role === 'MEMBER' || user?.role === 'LIBRARIAN' || user?.role === 'ADMIN'}
        onOpenShelfLocator={(b) => { setSelectedBookForFeature(b); setShelfLocatorOpen(true); }}
        onOpenReader={(b) => { setSelectedBookForFeature(b); setEbookReaderOpen(true); }}
                onReserveBook={handleReserveBook}
      />

      <BookFormModal
        isOpen={bookFormOpen}
        onClose={() => setBookFormOpen(false)}
        onSave={handleSaveBook}
        bookToEdit={editingBook}
      />

      <UserFormModal
        isOpen={userFormOpen}
        onClose={() => setUserFormOpen(false)}
        onSave={handleSaveUser}
        userToEdit={editingUser}
      />

      {/* Smart Modals */}
      <AIChatModal
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
        currentUser={user}
        onSelectBook={(b) => setSelectedBookForView(b)}
        onIssueBook={handleIssueBook}
        onOpenReservations={() => setActiveTab('reservations')}
      />

      
      <ShelfLocatorModal
        book={selectedBookForFeature}
        isOpen={shelfLocatorOpen}
        onClose={() => setShelfLocatorOpen(false)}
        allBooks={books}
        onSelectBook={(b) => setSelectedBookForView(b)}
      />

      <EBookReaderModal
        book={selectedBookForFeature}
        isOpen={ebookReaderOpen}
        onClose={() => setEbookReaderOpen(false)}
      />
    </div>
  );
}

export default App;


