# Team Task Manager

A full-stack, collaborative team task management web application (similar to Trello or Asana) designed for project organization, task assignment, progress tracking, and role-based workspace management.

## 🚀 Key Features

* **Authentication & Authorization**: Secure login and sign-up with password hashing. Users sign up as either an **Admin** (workspace manager) or a **Member**.
* **Workspace Team Creation**: Admins can create teams, generate unique Team IDs, and copy them to invite members. Members can join teams using these IDs.
* **Project Management**: Admins can create projects under teams and manage the project's member list (adding/removing team members to specific projects).
* **Kanban Workflow Board**: Interactive task board with Todo, In Progress, and Done columns. Supports drag-and-drop status changes as well as dropdown selection.
* **Analytical Dashboard**: Visual metrics using Recharts (doughnut charts for status distributions, workload bar charts for team member loads), task counters, and upcoming deadline lists.
* **Role-Based Access Control**:
  * **Admin**: Complete CRUD permissions over tasks, projects, workspaces, and member assignments.
  * **Member**: Scoped to view assigned projects, view tasks assigned to them, and update their task statuses.

---

## 🛠️ Technology Stack

* **Frontend**: React (Vite), Tailwind CSS, Lucide React, Recharts, Hello-Pangea DnD
* **Backend**: Node.js, Express, Mongoose (MongoDB)
* **Database**: MongoDB (Atlas)
* **Hosting/Deployment**: Railway

---

## 💻 Local Quickstart

### 1. Prerequisite
Ensure you have **Node.js** installed on your system.

### 2. Start Local Development Servers
We support running both projects simultaneously:

```bash
# Terminal 1: Start Backend API (Port 5000)
cd server
npm install
npm run dev

# Terminal 2: Start Frontend App (Port 5173)
cd client
npm install
npm run dev
```

Open your browser to `http://localhost:5173` to test the application.

---

## 🌐 Production Deployment on Railway

The repository is configured as a **unified monorepo** with a root `package.json` that automatically builds the client, compiles assets, and serves the frontend React app directly from the Express backend in production. This saves hosting costs and prevents CORS errors.

### Step-by-Step Deployment Steps:

1. **Push your code to GitHub**:
   Create a new GitHub repository and push your project to it.

2. **Deploy on Railway**:
   * Go to [Railway.app](https://railway.app) and sign in.
   * Click **New Project** -> **Deploy from GitHub repo** and select your repository.

3. **Configure Environment Variables**:
   In your Railway service configuration, go to the **Variables** tab and add:
   * `NODE_ENV`: `production` (tells the backend to build and serve the React static assets).
   * `MONGO_URI`: `mongodb+srv://...` (your MongoDB Atlas connection string).
   * `JWT_SECRET`: `your_secure_secret_key` (used for encrypting login tokens).
   * `PORT`: `5000` (Railway will bind the service port automatically).

4. **Verify Deployment**:
   * Once Railway builds the monorepo, click the **Generate Domain** button under the service settings to make it publicly accessible.
   * Open the generated URL. The full-stack application will be live, connected, and fully functional!
