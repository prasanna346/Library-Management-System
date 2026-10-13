import React, { useState } from 'react';
import { FileText, Search, Clock } from 'lucide-react';

export default function SystemLogsView({ logs }) {
  const [query, setQuery] = useState('');

  const filteredLogs = (logs || []).filter(log =>
    (log.username && log.username.toLowerCase().includes(query.toLowerCase())) ||
    (log.action && log.action.toLowerCase().includes(query.toLowerCase())) ||
    (log.details && log.details.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={22} color="var(--primary)" /> Real-Time System Audit Logs
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Security event tracking, user authentications, data edits, and issue transactions
          </p>
        </div>

        <div className="search-input-wrapper" style={{ minWidth: '260px' }}>
          <Search size={16} />
          <input
            type="text"
            className="input-field"
            placeholder="Search logs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor</th>
              <th>Role</th>
              <th>Action Code</th>
              <th>Event Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No system activity logs found.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id || Math.random()}>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <Clock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    {log.timestamp}
                  </td>
                  <td><strong>{log.username}</strong></td>
                  <td>
                    <span className={`role-badge ${(log.role || 'MEMBER').toLowerCase()}`}>
                      {log.role}
                    </span>
                  </td>
                  <td>
                    <code style={{ background: 'rgba(255,255,255,0.08)', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.78rem', color: 'var(--secondary)' }}>
                      {log.action}
                    </code>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{log.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
