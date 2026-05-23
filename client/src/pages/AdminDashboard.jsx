import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { CheckCircle2, AlertTriangle, Play, Calendar } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        if (isMounted) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };
    loadDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!stats) return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-indigo-600 font-semibold">Loading Analytics...</div>;

  const pieData = [
    { name: "Todo", value: stats.todoTasks || 0, color: "#6366f1" },
    { name: "In Progress", value: stats.inProgressTasks || 0, color: "#f59e0b" },
    { name: "Completed", value: stats.completedTasks || 0, color: "#10b981" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-600 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-extrabold tracking-tight">Admin Console</h1>
          <p className="mt-2 text-indigo-100 max-w-md">Overview of tasks progress, member loads, and deadlines.</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          <StatCard title="Total Tasks" value={stats.totalTasks} icon={Calendar} color="bg-indigo-500" />
          <StatCard title="Completed" value={stats.completedTasks} icon={CheckCircle2} color="bg-emerald-500" />
          <StatCard title="In Progress" value={stats.inProgressTasks} icon={Play} color="bg-amber-500" />
          <StatCard title="Overdue" value={stats.overdueTasks} icon={AlertTriangle} color="bg-rose-500" />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-2 gap-8 mt-8">
          {/* Pie Chart: Status */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Tasks by Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart: User Load */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Tasks per Member</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.tasksPerUser}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
                  <Tooltip cursor={{ fill: "rgba(99, 102, 241, 0.05)" }} />
                  <Bar dataKey="count" fill="#818cf8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* UPCOMING TASKS */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mt-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Upcoming Deadlines</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  <th className="pb-4">Task</th>
                  <th className="pb-4">Project</th>
                  <th className="pb-4">Assigned To</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.upcomingTasks?.length > 0 ? (
                  stats.upcomingTasks.map((task) => (
                    <tr key={task._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="py-4 font-semibold text-slate-800">{task.title}</td>
                      <td className="py-4 text-slate-500">{task.project?.name || "No Project"}</td>
                      <td className="py-4 text-slate-600">{task.assignedTo?.name || "Unassigned"}</td>
                      <td className="py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          task.status === "Done" ? "bg-emerald-50 text-emerald-600" :
                          task.status === "In Progress" ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="py-4 text-slate-500">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Limit"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">No tasks on schedule.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition duration-300">
      <div className="flex items-center justify-between">
        <span className="text-slate-400 font-semibold">{title}</span>
        <div className={`p-3 rounded-2xl text-white ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <h2 className="text-4xl font-extrabold text-slate-800 mt-4">{value}</h2>
    </div>
  );
}