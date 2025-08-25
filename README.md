
# 🎯 Schedule Management Reminder System API

## 📌 Introduction  
This project is a RESTful API for managing users, tasks, and automated email reminders. It provides endpoints for user authentication, task management, and schedules email notifications for upcoming tasks. Built with **Node.js**, **Express**, and **MongoDB**, it is lightweight, scalable, and easy to integrate with any frontend application.

---

## 👥 Team  
- **Ramya Sree Salividi** – rsalividi@uco.edu
- **Anand Kumar Gedala** – agedala@uco.edu  

---

## 🔍 How It Works  
Users can register, login, and manage tasks. The system:  

1. 👤 Handles user registration and authentication with hashed passwords.  
2. 📝 Allows creating, updating, retrieving, and deleting tasks.  
3. 📧 Sends automated **email reminders** for upcoming tasks using a background worker.  
4. 🌐 Exposes RESTful endpoints under `/api/taskmanagementapp/user` and `/api/taskmanagementapp/task`.  
5. 🛠️ Supports cross-origin requests and parses JSON and URL-encoded request bodies.

---

## ✨ Key Features  
- **User Management:** Register, login, profile updates.  
- **Task Management:** Create, read, update, delete tasks.  
- **Email Notifications:** Scheduled automated reminders.  
- **Tech Stack:** Node.js, Express, MongoDB, CORS, Body-parser.  
- **Worker:** Background scheduler for email notifications (`email.worker.js`).  

---

## 🚀 Setup Instructions  

1. Clone the repository:  
   ```bash
   git clone <repository-url>
   cd ScheduleManagementRemainderSystemApi
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with:

   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. Start the server:

   ```bash
   npm start
   ```

Server will run on `http://localhost:8000`.

---

## 📖 API Endpoints

### User Routes

```
POST   /api/taskmanagementapp/user/register
POST   /api/taskmanagementapp/user/login
GET    /api/taskmanagementapp/user/:id
PUT    /api/taskmanagementapp/user/:id
DELETE /api/taskmanagementapp/user/:id
```

### Task Routes

```
POST   /api/taskmanagementapp/task/
GET    /api/taskmanagementapp/task/
GET    /api/taskmanagementapp/task/:id
PUT    /api/taskmanagementapp/task/:id
DELETE /api/taskmanagementapp/task/:id
```

---

## 📁 Project Structure

```
ScheduleManagementRemainderSystemApi/
├── config/
│   └── database.js          # MongoDB connection
├── routes/
│   ├── user.routes.js
│   └── task.routes.js
├── workers/
│   └── email.worker.js      # Email notification scheduler
├── index.js                 # Entry point
└── package.json
```

---

