# Secure Notes

Full stack web application for secure note management.

This project demonstrates modern web development practices including authentication, REST APIs, database integration, and responsive UI design.

---

## Overview

Secure Notes allows users to:

- Create an account
- Log in securely
- Create, edit and delete personal notes
- Search notes instantly
- Access protected routes using JWT authentication

The application is built as a complete client-server architecture.

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt (password hashing)
- dotenv

---

## Architecture

The project is divided into two main parts:

- secure-notes-client (frontend)
- secure-notes-api (backend)

The frontend communicates with the backend through REST API endpoints.

Authentication is handled using JWT tokens stored in localStorage and sent via Authorization headers.

---

## Security Features

- Passwords are hashed using bcrypt before being stored in the database
- JWT-based authentication for protected routes
- Middleware-based route protection
- Environment variables for sensitive configuration
- Parameterized SQL queries to prevent SQL injection

---

## Features

### Authentication
- User registration
- Login with email and password
- Token-based session management
- Protected notes endpoint

### Notes Management (CRUD)
- Create notes
- Read notes
- Update notes
- Delete notes

### UI & UX
- Responsive layout
- Loading states
- Error handling feedback
- Clean card-based design
- Search functionality
- Disabled save button when no changes detected

---

## API Endpoints

### Authentication

POST /auth/register  
POST /auth/login  

### Notes

GET /notes  
POST /notes  
PUT /notes/:id  
DELETE /notes/:id  

All /notes routes require a valid JWT token.

---

## Database

PostgreSQL is used for data persistence.

### Tables

users  
- id  
- email  
- password_hash  

notes  
- id  
- title  
- content  
- user_id  

Each note is linked to a specific user.

---

## Running the Project Locally

### Backend

1. Navigate to the API folder:
   cd secure-notes-api

2. Install dependencies:
   npm install

3. Create a .env file:
   DATABASE_URL=your_database_url  
   JWT_SECRET=your_secret_key

4. Start server:
   npm run dev

Server runs on:
http://localhost:5000

---

### Frontend

1. Navigate to the client folder:
   cd secure-notes-client

2. Install dependencies:
   npm install

3. Start development server:
   npm run dev

App runs on:
http://localhost:5173

---

## What This Project Demonstrates

- Full stack application structure
- Client-server communication
- Authentication flow
- Secure password handling
- REST API design
- Database integration
- State management in React
- Conditional rendering
- Error handling
- Real-world project structure suitable for deployment

---

## Author

Petros Pieskä
