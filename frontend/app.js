const API = "https://team-task-manager-qzhj.onrender.com/api";
let token = localStorage.getItem("token") || "";

/* =========================
   🔐 LOGIN
========================= */
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  token = data.token;
  localStorage.setItem("token", token);

  alert("Login successful");

  loadProjects();
  getTasks();
  loadDashboard();
}


/* =========================
   🚪 LOGOUT
========================= */
function logout() {
  localStorage.removeItem("token");
  location.reload();
}


/* =========================
   📁 LOAD PROJECTS (Dropdown)
========================= */
async function loadProjects() {
  const res = await fetch(`${API}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const projects = await res.json();

  const dropdown = document.getElementById("projectDropdown");

  if (!dropdown) return;

  dropdown.innerHTML = "";

  projects.forEach(p => {
    const option = document.createElement("option");
    option.value = p._id;
    option.textContent = p.name;
    dropdown.appendChild(option);
  });
}


/* =========================
   📁 CREATE PROJECT
========================= */
async function createProject() {
  const name = document.getElementById("projectName").value;

  const res = await fetch(`${API}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Error creating project");
    return;
  }

  alert("Project created");

  loadProjects(); // auto refresh dropdown
}


/* =========================
   ✅ CREATE TASK
========================= */
async function createTask() {
  const title = document.getElementById("taskTitle").value;
  const projectId = document.getElementById("projectDropdown").value;
  const status = document.getElementById("status")?.value || "To Do";

  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      projectId,
      priority: "High",
      status
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Error creating task");
    return;
  }

  alert("Task created");

  getTasks();
  loadDashboard();
}


/* =========================
   📋 GET TASKS
========================= */
async function getTasks() {
  const res = await fetch(`${API}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

tasks.forEach(task => {
  const li = document.createElement("li");

  const statusClass =
    task.status === "Done"
      ? "done"
      : task.status === "In Progress"
      ? "inprogress"
      : "todo";

  const isDone = task.status === "Done";

  li.innerHTML = `
    <div class="task-item">
      <span><strong>${task.title}</strong></span>
      <span class="${statusClass}">${task.status}</span>
      <button 
        onclick="markDone('${task._id}')" 
        ${isDone ? "disabled style='background:gray;cursor:not-allowed'" : ""}
      >
        Done
      </button>
    </div>
  `;

  list.appendChild(li);
});
}


/* =========================
   🔄 UPDATE TASK STATUS
========================= */
async function markDone(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      status: "Done"
    })
  });

  getTasks();
  loadDashboard();
}


/* =========================
   📊 DASHBOARD
========================= */
async function loadDashboard() {
  const res = await fetch(`${API}/tasks/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  document.getElementById("dashboard").innerHTML = `
    <b>Total:</b> ${data.total} <br>
    <b>Done:</b> ${data.completed} <br>
    <b>In Progress:</b> ${data.inProgress} <br>
    <b>Todo:</b> ${data.todo} <br>
    <b>Overdue:</b> ${data.overdue}
  `;
}


/* =========================
   🚀 AUTO LOAD
========================= */
if (token) {
  loadProjects();
  getTasks();
  loadDashboard();
}