'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [logs, setLogs] = useState(null);
  const [error, setError] = useState('');

  const fetchLogs = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/logs', {
        headers: { 'x-admin-password': password },
      });

      const data = await res.json();
      if (res.ok) {
        setLogs(data.logs);
      } else {
        setError(data.error || 'Unauthorized');
      }
    } catch (err) {
      setError('Failed to fetch logs');
    }
  };

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', color: '#fff', backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Admin Dashboard</h1>

      {!logs ? (
        <form onSubmit={fetchLogs} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '15px' }}>
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
          />
          <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            View Logs
          </button>
          {error && <p style={{ color: '#ef4444' }}>{error}</p>}
        </form>
      ) : (
        <div>
          <h2>Captured Log Entries ({logs.length})</h2>
          <pre style={{ background: '#1e293b', padding: '20px', borderRadius: '5px', marginTop: '15px', overflowX: 'auto', color: '#38bdf8' }}>
            {JSON.stringify(logs, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
