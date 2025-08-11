MERN Blog — Fixed, ready-to-run
--------------------------------

This package contains a full MERN app (backend + frontend) with common errors fixed:
- Includes react-scripts so `npm start` works on client
- Uses multer version that exists
- Handles duplicate username errors and validates input
- Uses Tailwind v3 to avoid PostCSS v4 issues (dev dependency)
- Public viewing of published blogs
- Uploads stored in server/uploads/

Instructions:
1. Unzip the package.
2. Start server:
   cd backend
   cp .env.example .env
   # set MONGO_URI to your Atlas connection string and JWT_SECRET
   npm install
   npm run dev
3. Start client:
   cd frontend
   cp .env.example .env
   # set REACT_APP_API_URL=http://localhost:5000/api
   npm install
   npm start
