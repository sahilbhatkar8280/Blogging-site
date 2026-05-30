# 📝 MERN Blogging Platform

A modern, full-stack blogging application built with the MERN stack (MongoDB, Express, React, Node.js). Features user authentication, rich text editing, and a responsive design.

## ✨ Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Blog Post Management**: Create, read, update, and delete blog posts
- **Rich Text Editor**: Compose posts with React Quill for formatting
- **Image Upload**: Upload images for blog posts using Multer
- **Responsive Design**: Built with Tailwind CSS for mobile-friendly UI
- **Smooth Animations**: Framer Motion for elegant page transitions
- **Slug-based URLs**: SEO-friendly URLs using slugify
- **MongoDB Integration**: Persistent data storage with Mongoose ORM

## 🛠 Tech Stack

### Frontend
- **React 18**: Modern UI library
- **Tailwind CSS**: Utility-first CSS framework
- **React Router v6**: Client-side routing
- **React Quill**: Rich text editor
- **Framer Motion**: Animation library
- **Axios**: HTTP client
- **React Icons**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **Bcryptjs**: Password hashing
- **Multer**: File upload middleware
- **CORS**: Cross-Origin Resource Sharing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Copy environment file
cp .env.example .env

# Edit .env and add your MongoDB URI and JWT secret
# MONGO_URI=your_mongodb_atlas_uri
# JWT_SECRET=your_strong_secret_key

# Install dependencies
npm install

# Start development server
npm run dev
