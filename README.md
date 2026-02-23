# 🔐 Secure Notes  
### Production-Deployed Full Stack Authentication App

A secure full stack notes application built with React, Node.js, and PostgreSQL.  
Users can register, log in, and manage private notes stored in a production database.

---

## 🌍 Live Demo

- **Frontend:** https://secure-notes-vert.vercel.app  
- **Backend API:** https://secure-notes-hq99.onrender.com  
  _(API only – root route intentionally not implemented)_

---

## 📌 Overview

Secure Notes is a production-ready authentication-based web application demonstrating:

- JWT-based authentication
- Secure password hashing (bcrypt)
- User-isolated database queries
- Multi-service cloud deployment
- Environment-based configuration
- Real production debugging

The application is deployed across three independent services:

- **Frontend:** Vercel  
- **Backend API:** Render  
- **Database:** Neon (Serverless PostgreSQL)

---

## 🏗 Architecture


Client (React – Vercel)
↓
REST API (Express – Render)
↓
PostgreSQL (Neon)


The frontend communicates with the backend using Axios.  
The backend connects securely to Neon using SSL and environment variables.

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express
- PostgreSQL (pg)
- JSON Web Tokens (JWT)
- bcrypt

### Infrastructure
- Vercel (Frontend hosting)
- Render (Backend hosting)
- Neon (Serverless PostgreSQL)

---

## 🔐 Authentication Flow

1. User registers
2. Password is hashed using bcrypt
3. User logs in
4. Backend validates credentials
5. JWT token is issued
6. Token stored in localStorage
7. Protected routes require token verification
8. Notes are fetched using authenticated user ID

Each query is scoped by `user_id` to ensure data isolation.

---

## 🗄 Database Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
⚙️ Environment-Based Configuration

The backend automatically detects environment:

Uses DATABASE_URL in production

Falls back to localhost configuration in development

SSL enabled for Neon

Secrets managed via environment variables

Example production variables:

DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production

Frontend (Vercel):

VITE_API_URL=https://secure-notes-hq99.onrender.com
🧠 Production Challenges Solved

This project involved debugging real deployment issues:

Database schema mismatch in production

Missing password_hash column

Localhost vs production API URL mismatch

Incorrect environment variable configuration

PostgreSQL SSL configuration

500 / 404 / 400 error tracing via logs

Testing queries directly in Neon SQL Editor

All issues were resolved by aligning backend queries with the production schema and properly configuring environment variables across services.

📊 What This Project Demonstrates

Full stack architecture design

Secure authentication implementation

Production database configuration

Multi-platform cloud deployment

Environment separation (dev vs prod)

Reading and debugging production logs

Handling real-world deployment errors
