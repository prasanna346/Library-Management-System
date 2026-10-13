import React, { useState } from 'react';
import { 
  BookOpen, BookCheck, AlertTriangle, Users, TrendingUp, BarChart2, 
  Download, FileSpreadsheet, Flame, Layers, CheckCircle2 
} from 'lucide-react';

export default function ReportsView({ reportsData, books = [], issuedBooks = [] }) {
  const [downloadSuccess, setDownloadSuccess] = useState('');

  const metrics = reportsData || {
    totalBookTitles: books.length,
    totalBookCopies: books.reduce((acc, b) => acc + (b.totalCopies || 0), 0),
    availableCopies: books.reduce((acc, b) => acc + (b.availableCopies || 0), 0),
    currentlyIssued: issuedBooks.filter(i => i.status === 'ISSUED').length,
    totalReturned: issuedBooks.filter(i => i.status === 'RETURNED').length,
    overdueCount: issuedBooks.filter(i => i.status === 'ISSUED' && new Date(i.dueDate) < new Date()).length,
    totalMembers: 4,
    totalLibrarians: 1,
    popularBooks: [],
    categoryDistribution: {},
    floorDistribution: {}
  };

  const totalFines = issuedBooks.reduce((acc, i) => acc + (i.fineAmount || 0), 0);
  const totalCatalogValue = books.reduce((acc, b) => acc + ((b.price || 499) * (b.totalCopies || 1)), 0);

  // Popular books
  const popularBooks = metrics.popularBooks && metrics.popularBooks.length > 0
    ? metrics.popularBooks
    : [...books].sort((a, b) => (b.borrowCount || 0) - (a.borrowCount || 0)).slice(0, 6);

  // Category counts
  const categoryCounts = {};
  books.forEach(b => {
    categoryCounts[b.category] = (categoryCounts[b.category] || 0) + 1;
  });

  // Export CSV Function
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'CENTRAL LIBRARY MANAGEMENT SYSTEM - EXECUTIVE AUDIT REPORT\n';
    csvContent += `Generated On,${new Date().toLocaleString()}\n\n`;

    csvContent += '--- INVENTORY CATALOG SUMMARY ---\n';
    csvContent += 'Book ID,Title,Author,Category,ISBN,Price (INR),Available Copies,Total Copies,Borrow Count,Shelf Location\n';
    books.forEach(b => {
      const cleanTitle = `"${(b.title || '').replace(/"/g, '""')}"`;
      const cleanAuthor = `"${(b.author || '').replace(/"/g, '""')}"`;
      const cleanLocation = `"${(b.shelfLocation || '').replace(/"/g, '""')}"`;
      csvContent += `${b.id},${cleanTitle},${cleanAuthor},${b.category},${b.isbn},${b.price || 499},${b.availableCopies},${b.totalCopies},${b.borrowCount || 0},${cleanLocation}\n`;
    });

    csvContent += '\n--- CIRCULATION TRANSACTIONS ---\n';
    csvContent += 'Transaction ID,Book Title,Patron Username,Issue Date,Due Date,Status,Fine Amount (INR)\n';
    issuedBooks.forEach(i => {
      const cleanTitle = `"${(i.bookTitle || '').replace(/"/g, '""')}"`;
      csvContent += `${i.id},${cleanTitle},${i.username},${i.issueDate},${i.dueDate},${i.status},${i.fineAmount || 0}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LMS_Analytics_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('CSV / Excel Report successfully exported and downloaded!');
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  // Export PDF / Print Function
  const handleExportPDF = () => {
    window.print();
    setDownloadSuccess('Print / Save PDF dialog opened for executive report!');
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Top Banner with Action Buttons */}
      <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>
                <BarChart2 size={24} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                Advanced Analytics & Intelligence Dashboard
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
              Real-time circulation metrics, top-borrowed leaderboard, category distributions, and automated reporting.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleExportCSV}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderColor: '#10b981', color: '#34d399' }}
            >
              <FileSpreadsheet size={16} /> Export CSV / Excel
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={handleExportPDF}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Download size={16} /> Download PDF Report
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div style={{
            marginTop: '1rem',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            color: '#34d399',
            padding: '0.6rem 1rem',
            borderRadius: '8px',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <CheckCircle2 size={16} /> {downloadSuccess}
          </div>
        )}
      </div>

      {/* Primary KPI Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div className="stat-value">{metrics.totalBookCopies || 0}</div>
            <div className="stat-label">Total Inventory Copies ({metrics.totalBookTitles || 0} Titles)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
            <BookCheck size={24} />
          </div>
          <div>
            <div className="stat-value">{metrics.currentlyIssued || 0}</div>
            <div className="stat-label">Currently Issued Books</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="stat-value">{metrics.overdueCount || 0}</div>
            <div className="stat-label">Overdue Books (₹10/day)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6,182,212,0.15)', color: '#22d3ee' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="stat-value">{(metrics.totalMembers || 0) + (metrics.totalLibrarians || 0)}</div>
            <div className="stat-label">Registered Patrons & Staff</div>
          </div>
        </div>
      </div>

      {/* Row 2: Interactive Circulation Bar Chart & Financial Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(280px, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Circulation Velocity Chart */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingUp size={18} color="var(--primary)" /> Circulation Velocity & Ratio Analysis
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-Time Snapshot</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Bar 1: Available */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                <span style={{ color: '#34d399' }}>Available On Shelves</span>
                <span>{metrics.availableCopies || 0} Copies ({Math.round(((metrics.availableCopies || 0) / (metrics.totalBookCopies || 1)) * 100)}%)</span>
              </div>
              <div style={{ height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.round(((metrics.availableCopies || 0) / (metrics.totalBookCopies || 1)) * 100)}%`,
                  background: 'linear-gradient(90deg, #059669, #10b981)',
                  borderRadius: '6px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            {/* Bar 2: Currently Issued */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                <span style={{ color: '#818cf8' }}>Currently Checked Out</span>
                <span>{metrics.currentlyIssued || 0} Copies ({Math.round(((metrics.currentlyIssued || 0) / (metrics.totalBookCopies || 1)) * 100)}%)</span>
              </div>
              <div style={{ height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.round(((metrics.currentlyIssued || 0) / (metrics.totalBookCopies || 1)) * 100)}%`,
                  background: 'linear-gradient(90deg, #4f46e5, #6366f1)',
                  borderRadius: '6px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            {/* Bar 3: Overdue Rate */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                <span style={{ color: '#f87171' }}>Overdue Risk Volume</span>
                <span>{metrics.overdueCount || 0} Copies ({Math.round(((metrics.overdueCount || 0) / Math.max(1, metrics.currentlyIssued || 1)) * 100)}% of Issues)</span>
              </div>
              <div style={{ height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, Math.round(((metrics.overdueCount || 0) / Math.max(1, metrics.currentlyIssued || 1)) * 100))}%`,
                  background: 'linear-gradient(90deg, #dc2626, #ef4444)',
                  borderRadius: '6px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            {/* Bar 4: Completed Returns */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                <span style={{ color: '#22d3ee' }}>Historical Returns Fulfilled</span>
                <span>{metrics.totalReturned || 0} Successful Checkins</span>
              </div>
              <div style={{ height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: '85%',
                  background: 'linear-gradient(90deg, #0891b2, #06b6d4)',
                  borderRadius: '6px'
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Financial & Valuation Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#f8fafc' }}>
            Financial & Valuation Summary
          </h3>

          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              TOTAL CATALOG INVENTORY VALUATION
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981', margin: '0.2rem 0' }}>
              ₹{totalCatalogValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#93c5fd' }}>
              Replacement book cost in Indian Rupees (INR)
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              OVERDUE FINES RECOVERABLE (₹10/DAY)
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f59e0b', margin: '0.2rem 0' }}>
              ₹{totalFines.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#fbbf24' }}>
              Automated penalty rate: ₹10.00 INR per calendar day
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Popular Books Leaderboard & Category Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Most Borrowed Leaderboard */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Flame size={20} color="#f59e0b" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
              Top Most Popular Books Leaderboard
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {popularBooks.map((b, idx) => (
              <div
                key={b.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: idx === 0 ? '#f59e0b' : idx === 1 ? '#94a3b8' : idx === 2 ? '#b45309' : 'rgba(255,255,255,0.1)',
                    color: idx < 3 ? '#000' : '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 900
                  }}>
                    {idx + 1}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{b.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {b.author} • <span style={{ color: '#34d399' }}>₹{(b.price || 499).toFixed(0)} INR</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#f59e0b', fontSize: '0.88rem' }}>
                    {b.borrowCount || 40} Checkouts
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {b.availableCopies || 0} copies ready
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Layers size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
              Category Distribution
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Object.entries(categoryCounts).map(([cat, count], idx) => {
              const pct = Math.round((count / Math.max(1, books.length)) * 100);
              const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6'];
              const col = colors[idx % colors.length];

              return (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    <span>{cat}</span>
                    <span style={{ color: col }}>{count} Titles ({pct}%)</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: col,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
