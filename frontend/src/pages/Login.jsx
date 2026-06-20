import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      const fn = mode === 'login' ? api.login : api.signup;
      const r = await fn({ email, password, name });
      localStorage.setItem('token', r.token);
      localStorage.setItem('user', JSON.stringify(r.user));
      nav('/');
    } catch (e) { setErr(e.message); }
  }

  return (
    <div className="auth-wrap">
      <form className="card" onSubmit={submit}>
        <h1>🍳 PantryChef</h1>
        <p className="muted">{mode === 'login' ? 'Sign in to your account' : 'Create a new account'}</p>

        {mode === 'signup' && (
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        )}
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required />

        {err && <div className="error">{err}</div>}

        <button type="submit">{mode === 'login' ? 'Sign in' : 'Sign up'}</button>
        <button type="button" className="link"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </form>
    </div>
  );
}
