'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Logging in...');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Login successful!');
      } else {
        setMessage(data.error || 'Login failed.');
      }
    } catch (err) {
      setMessage('An error occurred.');
    }
  };

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', color: '#fff', backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Secure Login</h1>
      <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Please sign in to continue.</p>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '15px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </main>
  );
}
