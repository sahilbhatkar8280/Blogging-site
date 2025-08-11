import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import BlogCard from '../components/BlogCard';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get('/blogs')
      .then(r => {
        console.log('Fetched blogs:', r.data);  // Check the API response
        setBlogs(r.data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  if (blogs.length === 0) {
    return <div>No blogs to display.</div>;
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-4xl font-bold">Latest Blogs</h1>
        <p className="text-gray-600 mt-2">Public posts — visible to everyone.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((b) => (
          <BlogCard key={b._id} blog={b} />
        ))}
      </div>
    </div>
  );
}
