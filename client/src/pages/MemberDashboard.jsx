import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CheckCircle2, AlertTriangle, Play, Calendar } from "lucide-react";

export default function MemberDashboard() {
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
        console.error(err);
      }
    };
    loadDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!stats) return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-indigo-600 font-semibold">Loading Member Space...</div>;

  const pieData = [
    { name: "Todo", value: stats.todoTasks || 0, color: "#6366f1" },
    { name: "In Progress", value: stats.inProgressTasks || 0, color: "#f59e0b" },
    { name: "Completed", value: stats.completedTasks || 0, color: "#10b981" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-extrabold tracking-tight">My Workspace</h1>
          <p className="mt-2 text-indigo-100 max-w-md">Track your assigned workloads, status updates, and upcoming deliverables.</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center text-slate-400 font-semibold">
              <span>My Tasks</span>
              <Calendar className="h-5 w-5 text-indigo-500" />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-4">{stats.totalTasks}</h2>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center text-slate-400 font-semibold">
              <span>Done</span>
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-4">{stats.completedTasks}</h2>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center text-slate-400 font-semibold">
              <span>Active</span>
              <Play className="h-5 w-5 text-amber-500" />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-4">{stats.inProgressTasks}</h2>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center text-slate-400 font-semibold">
              <span>Overdue</span>
              <AlertTriangle className="h-5 w-5 text-rose-500" />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-4">{stats.overdueTasks}</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 col-span-1">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Status Summary</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
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

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 col-span-2">
            <h2 className="text-xl font-bold text-slate-800 mb-6">My Upcoming Deadlines</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    <th className="pb-4">Task Name</th>
                    <th className="pb-4">Project</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.upcomingTasks?.length > 0 ? (
                    stats.upcomingTasks.map((task) => (
                      <tr key={task._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                        <td className="py-4 font-semibold text-slate-800">{task.title}</td>
                        <td className="py-4 text-slate-500">{task.project?.name}</td>
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
                      <td colSpan={4} className="py-8 text-center text-slate-400">All caught up! No tasks left.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}