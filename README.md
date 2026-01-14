# Task Management System

## Overview

A full-stack Task Management System built with the MERN stack (MongoDB, Express, React, Node.js). It supports user authentication, task CRUD operations, proper categorization/prioritization, and a visual dashboard with statistics.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React (Icons), Recharts (Charts), Axios, React Router.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT (Authentication), BCrypt (Security).
- **Database**: MongoDB (Local or Atlas).

## Setup Instructions

### Prerequisites
- Node.js installed.
- MongoDB installed and running locally on port 27017 (or update `.env` with Atlas URI).

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   Server will run on `http://localhost:5000`.

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Application will run on `http://localhost:5173`.

## Features Implemented

- **User Authentication**: Register and Login with JWT.
- **Task Management**: Create, Read, Update, Delete tasks.
- **Filtering & Search**: Filter by Status (Pending, In Progress, Completed), Priority (High, Medium, Low), and Search by title/description.
- **Dashboard**: Visual statistics of tasks using charts.
- **Responsive Design**: Modern UI with Tailwind CSS, fully responsive.
- **Security**: Protected routes, password hashing.

## Challenges and Solutions

1.  **State Management**: Managing auth state across the app was handled using a dedicated `AuthContext` to persist user sessions and protect routes.
2.  **Dashboard Statistics**: Aggregating data for the dashboard was solved by creating a specialized backend endpoint `/api/tasks/stats` to offload processing from the client.

## API Documentation

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login user.
- `GET /api/tasks`: Get all tasks for logged-in user.
- `POST /api/tasks`: Create a new task.
- `GET /api/tasks/stats`: Get task statistics.
- `PUT /api/tasks/:id`: Update a task.
- `DELETE /api/tasks/:id`: Delete a task.
