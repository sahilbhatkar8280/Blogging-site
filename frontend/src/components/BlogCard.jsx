import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCard({ blog }){
  const img = blog.imageUrl ? (process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api','') + blog.imageUrl : blog.imageUrl) : null;
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      {img && <img src={img} alt={blog.title} className="w-full h-56 object-cover" />}
      <div className="p-4">
        <h3 className="text-xl font-semibold">{blog.title}</h3>
        <p className="text-gray-600 mt-2">{blog.content.slice(0,150)}{blog.content.length>150?'...':''}</p>
        <div className="mt-3 flex justify-between items-center">
          <Link to={'/blogs/' + blog._id} className="text-indigo-600">Read more →</Link>
          <span className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
