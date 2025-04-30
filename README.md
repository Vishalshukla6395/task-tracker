# Task Tracker

A full-stack task management app with user authentication (JWT) built on Express.js, React.js, and MongoDB.

## 📁 Folder Structure
```plaintext
task-tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── index.jsx
    ├── vite.config.js
    └── package.json
```

## ⚙️ Features
- **Auth:** Sign up, log in (JWT + bcrypt)
- **Projects:** Each user can create up to many projects (email, password, name, country)
- **Tasks:** CRUD within projects; fields: title, description, status (`To Do`/`In Progress`/`Completed`), createdAt, completedAt

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js, Mongoose (MongoDB Atlas).
- **Frontend:** React.js, Vite, Axios, CSS
- **Auth:** JWT, bcrypt

## 🚀 Quick Start
```bash
# Clone & install
git clone https://github.com/Vishalshukla6395/task-tracker.git && cd task-tracker

# Backend
cd backend
npm install && node index.js

# Frontend
cd ../frontend
npm install
npm run dev
```
