import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogDetails from './pages/BlogDetails';

export default function App(){
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(()=>{
    const raw = localStorage.getItem('user');
    if(raw) setUser(JSON.parse(raw));
  }, []);

  const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.pathname = '/';
  };

  return (
    <div>
      <nav className="bg-white shadow">
        <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
          <Link to='/' className="text-2xl font-bold text-indigo-600">MyBlog</Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            {user ? (
              <>
                <Link to="/create" className="bg-indigo-600 text-white px-3 py-1 rounded">Create</Link>
                <button onClick={logout} className="px-3">Logout</button>
                <span className="px-2">Hi, {user.username || user.name}</span>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3">Login</Link>
                <Link to="/register" className="px-3">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/login" element={<Login onAuth={()=>window.location.reload()} />} />
          <Route path="/register" element={<Register onAuth={()=>window.location.reload()} />} />
        </Routes>
      </main>
    </div>
  );
}
