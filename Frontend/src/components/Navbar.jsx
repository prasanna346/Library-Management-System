import React from 'react';
import { 
  BookOpen, LogOut, Sun, Moon, Shield, User, BarChart2, 
  Database, FileText, Search, BookCheck, GitBranch, 
  Sparkles, Bookmark, Mail 
} from 'lucide-react';

export default function Navbar({ 
  user, 
  activeTab, 
  setActiveTab, 
  theme, 
  toggleTheme, 
  onLogout, 
  onOpenAuth,
  onOpenAIChat
}) {
  const role = user?.role || 'GUEST';

  return (
    <header className=app-header>
      <div className=brand-section onClick={() => setActiveTab('catalog')} style={{ cursor: 'pointer' }}>
        <div className=logo-badge>
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className=brand-title>Library Management System</h1>
          <div className=brand-slogan>Organize • Track • Access • Learn</div>
        </div>
      </div>

      <nav className=nav-pills>
        <button
          className={
av-btn }
          onClick={() => setActiveTab('flowchart')}
          style={{ borderColor: 'rgba(99,102,241,0.4)' }}
        >
          <GitBranch size={16} color=var(--primary) /> System Flowchart
        </button>

        {user && (
          <>
            {/* Member Functions */}
            <button
              className={
av-btn }
              onClick={() => setActiveTab('catalog')}
            >
              <Search size={16} /> Search Catalog
            </button>

            <button
              className={
av-btn }
              onClick={() => setActiveTab('my-issued')}
            >
              <BookCheck size={16} /> My Issued Books
            </button>

            {/* Smart Additions: Reservations & Notifications */}
            <button
              className={
av-btn }
              onClick={() => setActiveTab('reservations')}
            >
              <Bookmark size={16} color=#f59e0b /> Reservations
            </button>

            <button
              className={
av-btn }
              onClick={() => setActiveTab('notifications')}
            >
              <Mail size={16} color=#3b82f6 /> Email Alerts
            </button>

            {/* Librarian Functions */}
            {(role === 'LIBRARIAN' || role === 'ADMIN') && (
              <>
                <button
                  className={
av-btn }
                  onClick={() => setActiveTab('manage-books')}
                >
                  <BookOpen size={16} /> Book Inventory
                </button>
                <button
                  className={
av-btn }
                  onClick={() => setActiveTab('members')}
                >
                  <User size={16} /> Manage Members
                </button>
                <button
                  className={
av-btn }
                  onClick={() => setActiveTab('reports')}
                >
                  <BarChart2 size={16} /> Reports & Analytics
                </button>
              </>
            )}

            {/* Admin Functions */}
            {role === 'ADMIN' && (
              <>
                <button
                  className={
av-btn }
                  onClick={() => setActiveTab('users-admin')}
                >
                  <Shield size={16} /> User Management
                </button>
                <button
                  className={
av-btn }
                  onClick={() => setActiveTab('logs')}
                >
                  <FileText size={16} /> System Logs
                </button>
                <button
                  className={
av-btn }
                  onClick={() => setActiveTab('backup')}
                >
                  <Database size={16} /> Backup / Restore
                </button>
              </>
            )}
          </>
        )}
      </nav>

      <div className=user-controls>
        {/* AI Assistant Quick Trigger */}
        <button
          type=button
          onClick={onOpenAIChat}
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            padding: '0.45rem 0.85rem',
            fontSize: '0.8rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
            transition: 'all 0.2s'
          }}
          title=Open Athena AI Library Assistant
        >
          <Sparkles size={16} /> AI Assistant
        </button>

        <button className=theme-toggle-btn onClick={toggleTheme} title=Toggle Dark/Light Mode>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{user.fullName || user.username}</div>
              <span className={ole-badge }>{role}</span>
            </div>
            <button className=icon-action-btn onClick={onLogout} title=Logout>
              <LogOut size={18} color=#ef4444 />
            </button>
          </div>
        ) : (
          <button className=btn-primary onClick={onOpenAuth}>
            Sign In / Register
          </button>
        )}
      </div>
    </header>
  );
}
