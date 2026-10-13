import React, { useState, useEffect, useCallback } from 'react';
import { 
  Bookmark, CheckCircle2, Search, RefreshCw 
} from 'lucide-react';

export default function ReservationsView({ currentUser, onNavigateTab }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  const isStaff = currentUser?.role === 'LIBRARIAN' || currentUser?.role === 'ADMIN';

  const fetchReservations = useCallback(() => {
    setLoading(true);
    const url = isStaff ? '/api/reservations' : `/api/reservations?username=${encodeURIComponent(currentUser?.username || '')}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (Array.isArray(data)) setReservations(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [isStaff, currentUser?.username]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleUpdateStatus = (id, newStatus) => {
    fetch(`/api/reservations/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Name': currentUser?.username || 'admin'
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(updated => {
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
        setActionMsg(`Reservation status updated to ${newStatus}`);
        setTimeout(() => setActionMsg(''), 4000);
      })
      .catch(() => {});
  };

  const handleCancelReservation = (id) => {
    if (window.confirm('Are you sure you want to cancel this book reservation?')) {
      fetch(`/api/reservations/${id}`, {
        method: 'DELETE',
        headers: { 'X-User-Name': currentUser?.username || 'member' }
      })
        .then(() => {
          setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'CANCELLED' } : r));
          setActionMsg('Reservation cancelled.');
          setTimeout(() => setActionMsg(''), 4000);
        })
        .catch(() => {});
    }
  };

  const filtered = reservations.filter(r => {
    const matchesQuery = (
      r.bookTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.bookIsbn?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="glass-card" style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <Bookmark size={22} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
              Online Book Reservations & Queue
            </h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            {isStaff 
              ? 'Manage member holds, priority reservation queue, and pickup desk dispatches.' 
              : 'Hold books in advance, track your queue ranking, and receive alerts when titles are ready.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={fetchReservations}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'spin-slow' : ''} /> Refresh
          </button>
          {!isStaff && (
            <button 
              type="button" 
              className="btn-primary" 
              onClick={() => onNavigateTab('catalog')}
            >
              Browse Catalog to Reserve
            </button>
          )}
        </div>
      </div>

      {actionMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10b981',
          color: '#34d399',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          fontSize: '0.85rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={16} /> {actionMsg}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="search-bar-container" style={{ marginBottom: '1.25rem' }}>
        <div className="search-input-wrapper">
          <Search size={18} />
          <input
            type="text"
            className="input-field"
            placeholder="Search reservations by book, patron username, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="input-field"
          style={{ width: 'auto' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending In Queue</option>
          <option value="READY_FOR_PICKUP">Ready For Pickup</option>
          <option value="FULFILLED">Fulfilled</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Reservations Table */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Queue #</th>
              <th>Book Title</th>
              <th>Patron</th>
              <th>Reservation Date</th>
              <th>Status</th>
              <th>Notes / Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  {loading ? 'Fetching reservation records...' : 'No reservations found matching criteria.'}
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const isReady = item.status === 'READY_FOR_PICKUP';
                const isPending = item.status === 'PENDING';

                return (
                  <tr key={item.id}>
                    <td>
                      <span style={{ 
                        display: 'inline-block',
                        padding: '0.2rem 0.55rem', 
                        borderRadius: '20px', 
                        background: 'rgba(99, 102, 241, 0.15)', 
                        color: 'var(--primary)', 
                        fontWeight: 800,
                        fontSize: '0.78rem'
                      }}>
                        #{item.queuePosition || 1}
                      </span>
                    </td>
                    <td>
                      <strong>{item.bookTitle}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ISBN: {item.bookIsbn}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{item.userFullName || item.username}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>@{item.username}</div>
                    </td>
                    <td>{item.reservationDate}</td>
                    <td>
                      <span className={`stock-badge ${isReady ? 'available' : isPending ? 'badge-warning' : 'unavailable'}`}
                        style={{
                          background: isReady ? 'rgba(16, 185, 129, 0.2)' : isPending ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: isReady ? '#34d399' : isPending ? '#fbbf24' : '#f87171',
                          border: `1px solid ${isReady ? '#10b981' : isPending ? '#f59e0b' : '#ef4444'}`
                        }}
                      >
                        {item.status?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {item.notes || 'Online Reserve'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {isStaff && isPending && (
                          <button
                            type="button"
                            className="btn-primary"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.72rem', background: '#10b981' }}
                            onClick={() => handleUpdateStatus(item.id, 'READY_FOR_PICKUP')}
                            title="Notify member that book has arrived at desk"
                          >
                            Mark Ready
                          </button>
                        )}
                        {isStaff && isReady && (
                          <button
                            type="button"
                            className="btn-primary"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.72rem' }}
                            onClick={() => handleUpdateStatus(item.id, 'FULFILLED')}
                            title="Mark as checked out by patron"
                          >
                            Fulfill
                          </button>
                        )}
                        {(isPending || isReady) && (
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.72rem', color: '#f87171' }}
                            onClick={() => handleCancelReservation(item.id)}
                            title="Cancel reservation"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
