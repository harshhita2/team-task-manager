import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar.jsx";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Calendar } from "lucide-react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const loadTasks = async () => {
      try {
        const res = await API.get("/tasks");
        if (isMounted) {
          setTasks(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadTasks();
    return () => {
      isMounted = false;
    };
  }, []);

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

  const columns = {
    Todo: tasks.filter((t) => t.status === "Todo"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    Done: tasks.filter((t) => t.status === "Done"),
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-8">My Tasks Board</h1>

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
                              <div className="flex justify-between items-center w-full">
                                <span className={`text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                  task.priority === "High" ? "bg-rose-50 text-rose-500" :
                                  task.priority === "Medium" ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"
                                }`}>
                                  {task.priority} Priority
                                </span>
                                <select
                                  value={task.status}
                                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                  className="text-2xs bg-slate-50 border border-slate-200 rounded-md px-1.5 py-0.5 outline-none cursor-pointer text-slate-500 font-semibold transition hover:border-slate-300"
                                >
                                  <option value="Todo">Todo</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Done">Done</option>
                                </select>
                              </div>

                              <h4 className="text-md font-bold text-slate-800 mt-3">{task.title}</h4>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{task.description}</p>

                              <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
                                <div className="flex items-center gap-1.5 text-2xs text-slate-400 font-semibold">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Limit"}
                                </div>
                                <span className="text-2xs text-slate-400 font-semibold">{task.project?.name}</span>
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
      </main>
    </div>
  );
}