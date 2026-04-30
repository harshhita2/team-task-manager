# 🚀 Team Task Manager

A full-stack Task Management application that allows users to create projects, manage tasks, and track work efficiently.

## 🚀 Live Preview

🔗 Frontend: https://team-task-man.netlify.app/  
🔗 Backend API: https://team-task-manager-qzhj.onrender.com  

---

## 📌 Features

- 🔐 User Authentication (Login)
- 📁 Create and Manage Projects
- ✅ Create and Track Tasks
- 🌐 Fully deployed (Frontend + Backend + Database)
- ⚡ Real-time API integration
- 💾 Persistent data using MongoDB

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (Vanilla JS)
- Netlify (Deployment)

### Backend
- Node.js
- Express.js
- JWT Authentication
- Render (Deployment)

### Database
- MongoDB Atlas (Cloud Database)

---

## ⚙️ Project Structure

team-task-manager/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── style.css
│
└── .gitignore
🔑 Environment Variables

Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

⚠️ Important: Never share your real database credentials publicly.

🚀 How to Run Locally
1️⃣ Clone the repository
git clone https://github.com/harshhita2/team-task-manager.git
cd team-task-manager
2️⃣ Setup Backend
cd backend
npm install
npm start
3️⃣ Setup Frontend

Open frontend/index.html in your browser
OR use Live Server in VS Code

🌍 Deployment
Frontend (Netlify)
Base directory: frontend
Publish directory: frontend
Backend (Render)
Environment variables configured
Connected to MongoDB Atlas
⚠️ Notes
First request may be slow due to Render free tier (cold start)
Ensure MongoDB Network Access allows your backend (e.g., 0.0.0.0/0 for development)
📈 Future Improvements
✏️ Edit & Delete Tasks
📊 Task Status Filtering
🔄 Loading indicators & better UX
📱 Fully responsive design
🔐 Token expiration handling
👩‍💻 Author

Harshita Khetan
🔗 GitHub: https://github.com/harshhita2
