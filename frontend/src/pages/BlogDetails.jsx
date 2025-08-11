import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

export default function BlogDetails(){
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  useEffect(()=> {
    API.get('/blogs/' + id).then(r=>setBlog(r.data)).catch(console.error);
  }, [id]);
  if(!blog) return <div>Loading...</div>;
  const img = blog.imageUrl ? (process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api','') + blog.imageUrl : blog.imageUrl) : null;
  return (
    <article className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
      {img && <img src={img} alt={blog.title} className="w-full h-80 object-cover rounded" />}
      <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
      <p className="text-gray-600 mt-2">By {blog.author?.username || blog.author?.name} • {new Date(blog.createdAt).toLocaleDateString()}</p>
      <div className="mt-6 whitespace-pre-line">{blog.content}</div>
    </article>
  );
}
