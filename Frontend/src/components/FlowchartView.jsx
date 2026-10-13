import React from 'react';
import { 
  BookOpen, GitBranch, Shield, User, Database, 
  FileText, LogIn, ArrowDown 
} from 'lucide-react';

export default function FlowchartView({ onNavigateTab, currentUser, onOpenAuth }) {
  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Top Banner Matching Project Poster */}
      <div className="glass-card" style={{ 
        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.4) 0%, rgba(15, 23, 42, 0.7) 100%)',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        marginBottom: '1.5rem',
        padding: '1.75rem 2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div className="logo-badge" style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
              <BookOpen size={30} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.5px', margin: 0, color: '#f8fafc' }}>
                Library Management System
              </h1>
              <div style={{ fontSize: '0.95rem', color: '#93c5fd', fontWeight: 600, marginTop: '0.2rem' }}>
                Organize • Track • Access • Learn
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', borderRadius: '20px', background: 'rgba(255,255,255,0.1)', color: '#e2e8f0', fontWeight: 600 }}>
              Full-Stack: React.js + Spring Boot + MySQL
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(360px, 1.4fr)', gap: '1.5rem' }}>
        {/* Left Card: Abstract */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(99,102,241,0.15)', color: 'var(--primary)' }}>
              <FileText size={20} />
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Project Abstract</h2>
          </div>

          <div style={{ fontSize: '0.88rem', lineHeight: '1.65', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <p>
              The <strong>Library Management System (LMS)</strong> is an enterprise software application designed to automate and simplify the operational workflows of a contemporary library. It helps in managing books, members, and issue/return transactions efficiently, providing a centralized and easy-to-use platform for both staff and patrons.
            </p>
            <p>
              The system empowers <strong>Librarians</strong> to catalog new books, update book details with cost pricing in <strong>Indian Rupees (₹ INR)</strong>, purge discarded titles, manage member records, issue and return books, track due dates, and monitor overdue fines. 
            </p>
            <p>
              <strong>Members</strong> can seamlessly browse the online catalog, inspect physical availability and cost, view their active issues, calculate dynamic fines (₹10/day overdue), and request renewals digitally.
            </p>
            <p>
              The backend is powered by <strong>Java and Spring Boot</strong> with RESTful endpoints communicating with a <strong>MySQL Database</strong>. Role-based access control (RBAC) securely protects administrative functionalities, maintains data privacy, and enables real-time system logs and data snapshots.
            </p>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              KEY ARCHITECTURAL HIGHLIGHTS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="role-badge member">RBAC Auth</span>
              <span className="role-badge librarian">₹ INR Currency</span>
              <span className="role-badge admin">Real-time Fines</span>
              <span className="role-badge" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>MySQL REST APIs</span>
            </div>
          </div>
        </div>

        {/* Right Card: System Flowchart */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                <GitBranch size={20} />
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>System Flowchart</h2>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Click any node to navigate
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            {/* Start */}
            <div style={{ 
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)', 
              color: 'white', 
              padding: '0.45rem 1.75rem', 
              borderRadius: '25px', 
              fontWeight: 800, 
              fontSize: '0.82rem',
              boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
            }}>
              Start
            </div>

            <ArrowDown size={16} color="var(--text-muted)" />

            {/* Open Application (Login) */}
            <button 
              type="button"
              onClick={onOpenAuth}
              style={{ 
                background: 'rgba(30, 41, 59, 0.8)', 
                border: '1.5px solid #3b82f6', 
                color: '#e2e8f0', 
                padding: '0.65rem 1.5rem', 
                borderRadius: '12px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                width: '85%',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              title="Click to open login dialog"
            >
              <LogIn size={16} color="#60a5fa" /> Open Application (Login: prasanna / 123456)
            </button>

            <ArrowDown size={16} color="var(--text-muted)" />

            {/* Authenticate User */}
            <div style={{ 
              background: 'rgba(124, 58, 237, 0.15)', 
              border: '1.5px solid #8b5cf6', 
              color: '#c4b5fd', 
              padding: '0.6rem 1.25rem', 
              borderRadius: '12px', 
              fontSize: '0.82rem',
              fontWeight: 700,
              width: '85%',
              textAlign: 'center'
            }}>
              Authenticate User (Member / Librarian / Admin)
            </div>

            <ArrowDown size={16} color="var(--text-muted)" />

            {/* Decision Diamond */}
            <div style={{
              background: '#f59e0b',
              color: '#000',
              padding: '0.5rem 1.2rem',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.78rem',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(245,158,11,0.3)'
            }}>
              Login Successful?
            </div>

            {/* Three Roles Branch */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.65rem', width: '100%', marginTop: '0.5rem' }}>
              {/* Member Functions */}
              <div style={{ 
                border: '1.5px solid #10b981', 
                borderRadius: '12px', 
                background: 'rgba(16, 185, 129, 0.05)',
                padding: '0.75rem 0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <div style={{ 
                  background: '#10b981', 
                  color: 'white', 
                  padding: '0.35rem', 
                  borderRadius: '6px', 
                  textAlign: 'center', 
                  fontWeight: 800, 
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem'
                }}>
                  <User size={13} /> Member
                </div>
                {[
                  { name: 'Search Books', tab: 'catalog' },
                  { name: 'View Book Details', tab: 'catalog' },
                  { name: 'Issue Book (if avail)', tab: 'catalog' },
                  { name: 'View Issued Books', tab: 'my-issued' },
                  { name: 'Renew Book', tab: 'my-issued' }
                ].map((item, i) => (
                  <button 
                    key={i}
                    type="button"
                    onClick={() => onNavigateTab(item.tab)}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      color: '#d1fae5',
                      fontSize: '0.72rem',
                      padding: '0.35rem 0.25rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontWeight: 600
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Librarian Functions */}
              <div style={{ 
                border: '1.5px solid #3b82f6', 
                borderRadius: '12px', 
                background: 'rgba(59, 130, 246, 0.05)',
                padding: '0.75rem 0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <div style={{ 
                  background: '#3b82f6', 
                  color: 'white', 
                  padding: '0.35rem', 
                  borderRadius: '6px', 
                  textAlign: 'center', 
                  fontWeight: 800, 
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem'
                }}>
                  <BookOpen size={13} /> Librarian
                </div>
                {[
                  { name: 'Add New Book', tab: 'manage-books' },
                  { name: 'Update Book Details', tab: 'manage-books' },
                  { name: 'Remove Book', tab: 'manage-books' },
                  { name: 'Manage Members', tab: 'members' },
                  { name: 'Issue / Return Book', tab: 'manage-books' },
                  { name: 'View Reports', tab: 'reports' }
                ].map((item, i) => (
                  <button 
                    key={i}
                    type="button"
                    onClick={() => onNavigateTab(item.tab)}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      color: '#dbeafe',
                      fontSize: '0.72rem',
                      padding: '0.35rem 0.25rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontWeight: 600
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Admin Functions */}
              <div style={{ 
                border: '1.5px solid #8b5cf6', 
                borderRadius: '12px', 
                background: 'rgba(139, 92, 246, 0.05)',
                padding: '0.75rem 0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <div style={{ 
                  background: '#8b5cf6', 
                  color: 'white', 
                  padding: '0.35rem', 
                  borderRadius: '6px', 
                  textAlign: 'center', 
                  fontWeight: 800, 
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem'
                }}>
                  <Shield size={13} /> Admin
                </div>
                {[
                  { name: 'Manage Users', tab: 'users-admin' },
                  { name: 'Manage Books', tab: 'manage-books' },
                  { name: 'Manage Librarians', tab: 'users-admin' },
                  { name: 'View System Logs', tab: 'logs' },
                  { name: 'Backup / Restore', tab: 'backup' }
                ].map((item, i) => (
                  <button 
                    key={i}
                    type="button"
                    onClick={() => onNavigateTab(item.tab)}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.25)',
                      color: '#ede9fe',
                      fontSize: '0.72rem',
                      padding: '0.35rem 0.25rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontWeight: 600
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <ArrowDown size={16} color="var(--text-muted)" />

            {/* Update Database */}
            <div style={{ 
              background: 'linear-gradient(135deg, #0f766e, #115e59)', 
              color: 'white', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '12px', 
              fontWeight: 700, 
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: '85%',
              justifyContent: 'center'
            }}>
              <Database size={16} /> Update Database (MySQL Persistence)
            </div>

            <ArrowDown size={16} color="var(--text-muted)" />

            {/* Confirmation Result */}
            <div style={{ 
              background: 'rgba(99, 102, 241, 0.15)', 
              border: '1.5px solid #6366f1', 
              color: '#c7d2fe', 
              padding: '0.55rem 1.25rem', 
              borderRadius: '12px', 
              fontWeight: 700, 
              fontSize: '0.8rem',
              width: '85%',
              textAlign: 'center'
            }}>
              Generate Confirmation / Display Real-Time Result
            </div>

            <ArrowDown size={16} color="var(--text-muted)" />

            {/* End */}
            <div style={{ 
              background: '#1e293b', 
              border: '2px solid #64748b', 
              color: '#cbd5e1', 
              padding: '0.45rem 1.75rem', 
              borderRadius: '25px', 
              fontWeight: 800, 
              fontSize: '0.82rem'
            }}>
              End
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
