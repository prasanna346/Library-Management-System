import React, { useState } from 'react';
import { Database, Download, Upload, CheckCircle2 } from 'lucide-react';

export default function BackupView({ books, users, issuedBooks, logs, onRestoreSuccess }) {
  const [statusMsg, setStatusMsg] = useState('');

  const handleDownloadBackup = () => {
    const data = {
      timestamp: new Date().toISOString(),
      system: 'Library Management System (LMS)',
      users,
      books,
      issuedBooks,
      logs
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `lms_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setStatusMsg('Database JSON Backup downloaded successfully!');
  };

  const handleRestoreBackup = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.books || parsed.users) {
            onRestoreSuccess(parsed);
            setStatusMsg('Database state restored successfully from uploaded file!');
          } else {
            throw new Error('Invalid LMS backup file format.');
          }
        } catch (err) {
          setStatusMsg(`Restore error: ${err.message}`);
        }
      };
    }
  };

  return (
    <div className="glass-card">
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Database size={22} color="var(--primary)" /> Database Backup & Disaster Recovery
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
        Export full JSON snapshots of system state (Users, Books, Issues, Logs) or restore system data.
      </p>

      {statusMsg && (
        <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399', padding: '0.85rem', borderRadius: '12px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {statusMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Export Card */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={18} color="var(--primary)" /> Export Database Backup
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Generates a downloadable `.json` file containing all catalog items, member records, and transaction history.
          </p>
          <button className="btn-primary" onClick={handleDownloadBackup} style={{ width: '100%', justifyContent: 'center' }}>
            <Download size={16} /> Download JSON Backup
          </button>
        </div>

        {/* Restore Card */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Upload size={18} color="var(--accent)" /> Restore System Snapshot
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Upload a previously exported `.json` file to restore the database tables and user state.
          </p>
          <label className="btn-secondary" style={{ width: '100%', justifyContent: 'center', cursor: 'pointer' }}>
            <Upload size={16} /> Select Backup File to Restore
            <input type="file" accept=".json" onChange={handleRestoreBackup} style={{ display: 'none' }} />
          </label>
        </div>
      </div>
    </div>
  );
}
