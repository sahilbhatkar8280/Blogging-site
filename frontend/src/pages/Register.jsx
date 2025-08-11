import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Register({ onAuth }){
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { username, name, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (onAuth) onAuth();
      navigate('/');
    } catch (err) { alert(err?.response?.data?.message || 'Register failed'); }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-4">
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="w-full p-3 border rounded" />
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name (optional)" className="w-full p-3 border rounded" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email (optional)" className="w-full p-3 border rounded" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-3 border rounded" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create account</button>
      </form>
    </div>
  );
}
