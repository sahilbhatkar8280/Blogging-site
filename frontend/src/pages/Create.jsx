import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Create(){
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [published, setPublished] = useState(true);
  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if(!token) return alert('Login required');
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('published', String(published));
    if(image) fd.append('image', image);
    try {
      await API.post('/blogs', fd, { headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'multipart/form-data' } });
      navigate('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Error');
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form onSubmit={submit} className="space-y-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-3 border rounded" required />
        <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" rows={8} className="w-full p-3 border rounded" required />
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2"><input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)} /> <span>Publish</span></label>
        </div>
        <input type="file" onChange={e=>setImage(e.target.files[0])} />
        <div><button className="bg-indigo-600 text-white px-4 py-2 rounded">Publish</button></div>
      </form>
    </div>
  );
}
