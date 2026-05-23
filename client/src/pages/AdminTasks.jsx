import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, Trash2, Calendar } from "lucide-react";

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  const loadData = useCallback(async () => {
    try {
      const projRes = await API.get("/projects");
      setProjects(projRes.data);
      const tasksRes = await API.get("/tasks");
      setTasks(tasksRes.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadData]);

  const handleProjectChange = async (projectId) => {
    setSelectedProjectId(projectId);
    setAssignedUserId("");
    if (!projectId) {
      setProjectMembers([]);
      return;
    }
    try {
      const res = await API.get(`/projects/${projectId}/members`);
      setProjectMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title || !selectedProjectId || !assignedUserId) {
      alert("Please fill in required fields.");
      return;
    }
    try {
      await API.post("/tasks", {
        title,
        description,
        dueDate,
        priority,
        project: selectedProjectId,
        assignedTo: assignedUserId,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      setSelectedProjectId("");
      setAssignedUserId("");
      setProjectMembers([]);
      setShowModal(false);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/${taskId}`);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const updatedTasks = Array.from(tasks);
    const taskIdx = updatedTasks.findIndex((t) => t._id === taskId);
    if (taskIdx === -1) return;

    const prevStatus = updatedTasks[taskIdx].status;
    updatedTasks[taskIdx].status = newStatus;
    setTasks(updatedTasks);

    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
    } catch (err) {
      console.error(err);
      const rollbackTasks = Array.from(tasks);
      rollbackTasks[taskIdx].status = prevStatus;
      setTasks(rollbackTasks);
      alert("Failed to update status on server");
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedTasks = Array.from(tasks);
    const taskIdx = updatedTasks.findIndex((t) => t._id === draggableId);
    if (taskIdx === -1) return;

    const task = updatedTasks[taskIdx];
    const prevStatus = task.status;
    task.status = destination.droppableId;
    setTasks(updatedTasks);

    try {
      await API.put(`/tasks/${draggableId}`, { status: destination.droppableId });
    } catch (err) {
      console.error(err);
      const rollbackTasks = Array.from(tasks);
      rollbackTasks[taskIdx].status = prevStatus;
      setTasks(rollbackTasks);
      alert("Failed to update status on server");
    }
  };

  const columns = {
    Todo: tasks.filter((t) => t.status === "Todo"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    Done: tasks.filter((t) => t.status === "Done"),
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">Tasks Board</h1>
            <p className="text-xs text-slate-400 mt-1">Manage project workflow in columns.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:opacity-95 text-white px-6 py-3.5 rounded-2xl font-semibold shadow-lg shadow-indigo-500/10 transition"
          >
            <Plus className="h-5 w-5" />
            Create Task
          </button>
        </div>

        {/* Drag and Drop Container */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 gap-6">
            {Object.keys(columns).map((colName) => (
              <Droppable droppableId={colName} key={colName}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`rounded-3xl p-6 bg-slate-100/50 border border-slate-200/50 min-h-[500px] transition duration-200 ${
                      snapshot.isDraggingOver ? "bg-indigo-50/20 border-indigo-200" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">{colName}</h3>
                      <span className="text-xs font-bold text-slate-400 bg-slate-200/50 px-2.5 py-1 rounded-full">
                        {columns[colName].length}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {columns[colName].map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-2xl p-5 border border-slate-200/50 shadow-sm transition hover:shadow-md ${
                                snapshot.isDragging ? "shadow-xl ring-2 ring-indigo-500/10 border-indigo-200" : ""
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <span className={`text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                  task.priority === "High" ? "bg-rose-50 text-rose-500" :
                                  task.priority === "Medium" ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"
                                }`}>
                                  {task.priority} Priority
                                </span>
                                <div className="flex items-center gap-2">
                                  <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                    className="text-2xs bg-slate-50 border border-slate-200 rounded-md px-1 py-0.5 outline-none cursor-pointer text-slate-500 font-semibold transition hover:border-slate-300"
                                  >
                                    <option value="Todo">Todo</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                  </select>
                                  <button onClick={() => handleDeleteTask(task._id)} className="text-slate-400 hover:text-rose-500 transition">
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>

                              <h4 className="text-md font-bold text-slate-800 mt-3">{task.title}</h4>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{task.description}</p>

                              <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
                                <div className="flex items-center gap-1.5 text-2xs text-slate-400 font-semibold">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Limit"}
                                </div>
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-2xs font-bold text-indigo-600" title={task.assignedTo?.name}>
                                  {task.assignedTo?.name?.charAt(0).toUpperCase()}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {/* Modal form */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Launch New Task</h3>
                <button onClick={() => { setShowModal(false); setProjectMembers([]); }} className="text-slate-400 hover:text-slate-600 font-semibold text-sm">Close</button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Refactor auth state, write docs..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Project</label>
                    <select
                      value={selectedProjectId}
                      onChange={(e) => handleProjectChange(e.target.value)}
                      className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 bg-white"
                    >
                      <option value="">Select project</option>
                      {projects.map((p) => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Assign Member</label>
                    <select
                      value={assignedUserId}
                      onChange={(e) => setAssignedUserId(e.target.value)}
                      disabled={!selectedProjectId}
                      className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 bg-white disabled:opacity-50"
                    >
                      <option value="">Select members</option>
                      {projectMembers.map((m) => (
                        <option key={m._id} value={m._id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 bg-white"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Details about task requirements..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:opacity-95 text-white py-3.5 rounded-xl font-semibold text-sm transition">
                  Create Task
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}