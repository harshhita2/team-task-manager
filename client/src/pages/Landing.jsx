import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Network,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Activity,
  User,
  Clock,
  Sparkles,
  Lock,
  Layers,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Users,
  ShieldCheck,
  CheckSquare,
  Square
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function Landing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("kanban");

  // --- INTERACTIVE TAB 1: KANBAN STATE ---
  const [kanbanTasks, setKanbanTasks] = useState([
    { id: 1, title: "Database Schema Design", status: "Done", priority: "High" },
    { id: 2, title: "Configure JWT Middleware", status: "In Progress", priority: "High" },
    { id: 3, title: "Build Member Dashboard UI", status: "To Do", priority: "Medium" },
    { id: 4, title: "Write API Integration Tests", status: "To Do", priority: "Low" }
  ]);

  const moveTask = (taskId, direction) => {
    const statuses = ["To Do", "In Progress", "Done"];
    setKanbanTasks(
      kanbanTasks.map((task) => {
        if (task.id === taskId) {
          const currentIndex = statuses.indexOf(task.status);
          const nextIndex = currentIndex + direction;
          if (nextIndex >= 0 && nextIndex < statuses.length) {
            return { ...task, status: statuses[nextIndex] };
          }
        }
        return task;
      })
    );
  };

  // --- INTERACTIVE TAB 2: ANALYTICS STATE ---
  const [analyticsMetric, setAnalyticsMetric] = useState("workload");

  const workloadData = [
    { name: "Alex (Dev)", tasks: 5 },
    { name: "Sarah (Dev)", tasks: 8 },
    { name: "John (QA)", tasks: 4 },
    { name: "Emma (PM)", tasks: 6 }
  ];

  const statusData = [
    { name: "To Do", value: 6, color: "#f59e0b" },
    { name: "In Progress", value: 5, color: "#6366f1" },
    { name: "Done", value: 12, color: "#10b981" }
  ];

  // --- INTERACTIVE TAB 3: SCOPING STATE ---
  const [scopedMembers, setScopedMembers] = useState([
    { id: "m1", name: "Alex Jenkins", role: "Frontend Dev", assigned: true, avatar: "AJ" },
    { id: "m2", name: "Sarah Connor", role: "Backend Dev", assigned: true, avatar: "SC" },
    { id: "m3", name: "John Miller", role: "QA Engineer", assigned: false, avatar: "JM" },
    { id: "m4", name: "Emma Watson", role: "Product Manager", assigned: false, avatar: "EW" }
  ]);

  const toggleMemberAssignment = (id) => {
    setScopedMembers(
      scopedMembers.map((m) => (m.id === id ? { ...m, assigned: !m.assigned } : m))
    );
  };

  // --- INTERACTIVE TAB 4: RBAC STATE ---
  const [rbacRole, setRbacRole] = useState("Admin");
  const [memberTasks, setMemberTasks] = useState([
    { id: "t1", title: "Complete API rate limiting", completed: false },
    { id: "t2", title: "Review frontend merge requests", completed: true },
    { id: "t3", title: "Update project dependency versions", completed: false }
  ]);

  const toggleMemberTask = (id) => {
    setMemberTasks(
      memberTasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const features = [
    { id: "kanban", label: "Interactive Kanban", icon: Layers },
    { id: "analytics", label: "Workload Analytics", icon: BarChart3 },
    { id: "scoping", label: "Project Scoping", icon: Users },
    { id: "rbac", label: "RBAC Workspaces", icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 overflow-x-hidden relative font-sans">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-fuchsia-900/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="border-b border-white/5 bg-[#070913]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              TeamPulse
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#how-it-works" className="hover:text-white transition">How it works</a>
            <a href="#dashboard" className="hover:text-white transition">Preview</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold hover:text-white transition px-4 py-2 text-slate-300">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto text-center relative z-10">
        {/* Subheader badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/35 bg-indigo-500/5 text-indigo-300 text-xs font-semibold mb-6 hover:bg-indigo-500/10 transition cursor-pointer">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
          <span>Premium Workspace Collaboration</span>
          <ArrowRight className="h-3 w-3" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] mb-6">
          Your team's unified{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            project
            <svg
              className="absolute left-0 bottom-[-8px] w-full h-3 text-purple-500/80"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0,5 Q25,0 50,5 T100,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          workspace
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          TeamPulse combines visual Kanban boards, team workload analytics, and scoped workspaces to keep your project tasks aligned and productive.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            to="/signup"
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start for free</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Sign In</span>
          </Link>
        </div>

        {/* Interactive Feature Previews Tab Bar */}
        <div id="features" className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 max-w-5xl mx-auto mb-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = activeTab === feature.id;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition duration-200 ${
                  isActive
                    ? "bg-[#181d3d] text-white shadow-md border border-white/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                <span>{feature.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Preview Card */}
        <div id="dashboard" className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-[#0c0f21]/80 shadow-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden text-left min-h-[480px]">
          {/* Decorative glass blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {/* INTERACTIVE TAB 1: KANBAN BOARD */}
            {activeTab === "kanban" && (
              <motion.div
                key="kanban"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Layers className="h-5 w-5 text-indigo-400" />
                      Visual Kanban Board
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Click the arrow buttons to interactively transition tasks between stages. Try it out!
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/signup")}
                    className="self-start sm:self-center px-4 py-2 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 rounded-xl text-xs font-semibold transition"
                  >
                    Open Live Board
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-2">
                  {/* Columns */}
                  {["To Do", "In Progress", "Done"].map((colName) => {
                    const colTasks = kanbanTasks.filter((t) => t.status === colName);
                    const colHeaderColor =
                      colName === "To Do"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : colName === "In Progress"
                        ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

                    return (
                      <div key={colName} className="bg-[#121630]/65 border border-white/5 rounded-2xl p-4 flex flex-col min-h-[280px]">
                        <div className={`flex items-center justify-between px-3 py-1.5 rounded-xl border text-xs font-bold ${colHeaderColor} mb-4`}>
                          <span>{colName}</span>
                          <span className="bg-black/35 px-2 py-0.5 rounded-full text-[10px]">
                            {colTasks.length}
                          </span>
                        </div>

                        <div className="space-y-3 flex-1 overflow-y-auto">
                          <AnimatePresence>
                            {colTasks.map((task) => (
                              <motion.div
                                key={task.id}
                                layoutId={`task-${task.id}`}
                                className="bg-[#0c0f21] border border-white/5 p-4 rounded-xl shadow-md space-y-3 hover:border-white/10 transition"
                              >
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                      task.priority === "High"
                                        ? "bg-rose-500/15 text-rose-400 border border-rose-500/20"
                                        : task.priority === "Medium"
                                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                                        : "bg-slate-500/15 text-slate-400 border border-slate-500/20"
                                    }`}
                                  >
                                    {task.priority}
                                  </span>
                                </div>
                                <h4 className="text-xs font-semibold text-slate-200 leading-snug">
                                  {task.title}
                                </h4>

                                <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-white/5">
                                  {colName !== "To Do" && (
                                    <button
                                      onClick={() => moveTask(task.id, -1)}
                                      className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-white transition"
                                      title="Move Left"
                                    >
                                      <ChevronLeft className="h-4 w-4" />
                                    </button>
                                  )}
                                  {colName !== "Done" && (
                                    <button
                                      onClick={() => moveTask(task.id, 1)}
                                      className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-white transition"
                                      title="Move Right"
                                    >
                                      <ChevronRight className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>

                          {colTasks.length === 0 && (
                            <div className="flex flex-col items-center justify-center flex-1 h-32 border border-dashed border-white/5 rounded-xl text-slate-600 text-xs">
                              No Tasks
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* INTERACTIVE TAB 2: WORKLOAD ANALYTICS */}
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-3 gap-6"
              >
                <div className="md:col-span-2 space-y-6">
                  {/* Chart Container */}
                  <div className="bg-[#121630]/65 border border-white/5 rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-indigo-400" />
                        Interactive Performance Metrics
                      </h3>
                      {/* Metric Toggle */}
                      <div className="flex bg-black/45 p-1 rounded-xl border border-white/5 text-xs">
                        <button
                          onClick={() => setAnalyticsMetric("workload")}
                          className={`px-3 py-1.5 rounded-lg transition font-medium ${
                            analyticsMetric === "workload" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          Workloads
                        </button>
                        <button
                          onClick={() => setAnalyticsMetric("status")}
                          className={`px-3 py-1.5 rounded-lg transition font-medium ${
                            analyticsMetric === "status" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          Task Stages
                        </button>
                      </div>
                    </div>

                    <div className="h-48 w-full">
                      {analyticsMetric === "workload" ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={workloadData}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip
                              contentStyle={{ background: "#0c0f21", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}
                              labelStyle={{ color: "#94a3b8" }}
                            />
                            <Bar dataKey="tasks" fill="#6366f1" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={statusData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{ background: "#0c0f21", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>

                  <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-5 flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 mt-0.5">
                      <Activity className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-indigo-300 mb-1">Visual Workload Balancing</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Administrators see real-time task allocations across all assigned project members. This prevents developer burnout and guarantees smooth sprint completions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Status aggregate cards */}
                  <div className="bg-[#121630]/65 border border-white/5 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Metrics Snapshot</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#0c0f21] border border-white/5 p-3 rounded-xl">
                        <span className="text-[10px] text-slate-400 block mb-1">Total Tasks</span>
                        <span className="text-lg font-bold text-white">23</span>
                      </div>
                      <div className="bg-[#0c0f21] border border-white/5 p-3 rounded-xl">
                        <span className="text-[10px] text-slate-400 block mb-1">Completed</span>
                        <span className="text-lg font-bold text-emerald-400">12</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                        <span>Sprint Completion Rate</span>
                        <span className="text-slate-200 font-semibold">52%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full" style={{ width: "52%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Redirection box */}
                  <div className="bg-gradient-to-tr from-indigo-900/10 to-purple-900/15 border border-indigo-500/25 p-5 rounded-2xl text-center space-y-3">
                    <span className="text-xs font-semibold text-indigo-300 block">Analytics & Charts Dashboard</span>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/20"
                    >
                      Login to View Charts
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* INTERACTIVE TAB 3: PROJECT SCOPING */}
            {activeTab === "scoping" && (
              <motion.div
                key="scoping"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-3 gap-6"
              >
                <div className="md:col-span-2 space-y-6">
                  {/* Member Assignment Interface */}
                  <div className="bg-[#121630]/65 border border-white/5 rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-200">
                          Workspace Project Assignment Portal
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Toggle the toggle buttons next to team members to assign them to project scope.
                        </p>
                      </div>
                      <div className="text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">
                        Assigned: {scopedMembers.filter((m) => m.assigned).length} / {scopedMembers.length}
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      {scopedMembers.map((member) => (
                        <div
                          key={member.id}
                          className={`flex items-center justify-between p-3 rounded-xl border transition duration-200 ${
                            member.assigned
                              ? "bg-indigo-500/5 border-indigo-500/25 text-white"
                              : "bg-[#0c0f21] border-white/5 text-slate-400"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              member.assigned ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                            }`}>
                              {member.avatar}
                            </div>
                            <div>
                              <div className="text-xs font-bold">{member.name}</div>
                              <div className="text-[10px] text-slate-500">{member.role}</div>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleMemberAssignment(member.id)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition ${
                              member.assigned
                                ? "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500"
                                : "bg-transparent border-white/10 hover:border-white/20 text-slate-300"
                            }`}
                          >
                            {member.assigned ? "Assigned" : "Assign"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Assignment overview block */}
                  <div className="bg-[#121630]/65 border border-white/5 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Project Scope Card</h4>
                    <div className="bg-[#0c0f21] border border-white/5 p-4 rounded-xl space-y-3">
                      <div>
                        <span className="text-[10px] text-slate-500">Project Name</span>
                        <div className="text-xs font-bold text-white">E-Commerce Gateway Integration</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500">Active Participants</span>
                        <div className="flex -space-x-1.5 overflow-hidden mt-1.5">
                          {scopedMembers
                            .filter((m) => m.assigned)
                            .map((member) => (
                              <div
                                key={member.id}
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0c0f21] bg-indigo-600 flex items-center justify-center text-[9px] font-bold text-white"
                                title={member.name}
                              >
                                {member.avatar}
                              </div>
                            ))}
                          {scopedMembers.filter((m) => m.assigned).length === 0 && (
                            <span className="text-[10px] text-rose-400 font-semibold">No members assigned</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scoping details */}
                  <div className="bg-emerald-950/20 border border-emerald-500/20 p-5 rounded-2xl flex items-start gap-3">
                    <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="text-xs leading-relaxed text-slate-300">
                      <strong>Admin Scoping:</strong> Project creators can dynamically assign and remove registered team members, controlling who views and collaborates inside workspaces.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* INTERACTIVE TAB 4: RBAC SECURITY WORKSPACES */}
            {activeTab === "rbac" && (
              <motion.div
                key="rbac"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Lock className="h-5 w-5 text-indigo-400" />
                      Role-Based Access Control (RBAC)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Choose a role to preview the restricted dashboard perspective they experience inside TeamPulse.
                    </p>
                  </div>

                  {/* Role Selector Toggles */}
                  <div className="flex bg-black/45 p-1 rounded-xl border border-white/5 text-xs">
                    <button
                      onClick={() => setRbacRole("Admin")}
                      className={`px-4 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                        rbacRole === "Admin" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Admin View
                    </button>
                    <button
                      onClick={() => setRbacRole("Member")}
                      className={`px-4 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                        rbacRole === "Member" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <User className="h-3.5 w-3.5" />
                      Member View
                    </button>
                  </div>
                </div>

                {rbacRole === "Admin" ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Admin Dashboard Preview */}
                    <div className="md:col-span-2 bg-[#121630]/65 border border-white/5 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                        <span>Admin Workspace Control Center</span>
                        <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Full Privileges</span>
                      </div>

                      <div className="bg-[#0c0f21] border border-white/5 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                          <span className="font-semibold text-slate-200">System Management Actions</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-white/5 border border-white/5 rounded-lg hover:border-indigo-500/20 transition cursor-pointer">
                            <Plus className="h-4 w-4 text-indigo-400 mb-1" />
                            <div className="text-[10px] font-bold text-white">Create New Project</div>
                          </div>
                          <div className="p-3 bg-white/5 border border-white/5 rounded-lg hover:border-indigo-500/20 transition cursor-pointer">
                            <Users className="h-4 w-4 text-indigo-400 mb-1" />
                            <div className="text-[10px] font-bold text-white">Manage Team Members</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400">
                        🔑 Admins possess permissions to create team workspaces, delete overdue projects, customize Kanban lists, and view global team workload statistics.
                      </div>
                    </div>

                    <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-5 space-y-3">
                      <h4 className="text-sm font-semibold text-indigo-300">Admin Control Privileges</h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-indigo-400" />
                          <span>Global Task Creation/Deletion</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-indigo-400" />
                          <span>Scope project memberships</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-indigo-400" />
                          <span>View aggregate performance metrics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Member Dashboard Preview */}
                    <div className="md:col-span-2 bg-[#121630]/65 border border-white/5 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                        <span>Member View: My Tasks only</span>
                        <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">Restricted Access</span>
                      </div>

                      <div className="bg-[#0c0f21] border border-white/5 rounded-xl p-4 space-y-2.5">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-bold">Assigned Tasks Checklist</div>
                        {memberTasks.map((task) => (
                          <div
                            key={task.id}
                            onClick={() => toggleMemberTask(task.id)}
                            className="flex items-center gap-3 p-2 bg-white/5 border border-white/5 rounded-lg hover:border-purple-500/20 transition cursor-pointer select-none"
                          >
                            {task.completed ? (
                              <CheckSquare className="h-4 w-4 text-purple-400 shrink-0" />
                            ) : (
                              <Square className="h-4 w-4 text-slate-500 shrink-0" />
                            )}
                            <span className={`text-xs ${task.completed ? "line-through text-slate-500" : "text-slate-200"}`}>
                              {task.title}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="text-xs text-slate-400">
                        🔒 Members are security-restricted from seeing other user metrics or editing other projects. They focus exclusively on completing their own assigned work.
                      </div>
                    </div>

                    <div className="bg-purple-950/20 border border-purple-500/20 rounded-2xl p-5 space-y-3">
                      <h4 className="text-sm font-semibold text-purple-300">Member Restrictions</h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-purple-400" />
                          <span>View assigned tasks only</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-purple-400" />
                          <span>Interact via simple Kanban Board</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-purple-400" />
                          <span>No global admin configs access</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-indigo-400 mb-2">21%</div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">faster task delivery</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-purple-400 mb-2">0</div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">missed project deadlines</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-emerald-400 mb-2">100%</div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">secure jwt authentication</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-amber-400 mb-2">13%</div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">less team meeting overhead</p>
          </div>
        </div>
      </section>

      {/* Product Highlight / How It Works */}
      <section id="how-it-works" className="py-20 border-t border-white/5 bg-[#0a0d1d]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Project management, rebuilt from the ground up
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Eliminate spreadsheets and endless status tracking. TeamPulse gives your workspace real-time metrics, Kanban ease, and active role security.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#121630] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Dynamic Scoping</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Admins scope projects, select and assign team members, and partition task ownership inside secure, isolated namespaces.
              </p>
            </div>

            <div className="bg-[#121630] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Interactive Kanban</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Drag, drop, or chevron-shift task columns in real-time. Task statuses sync client-side boards with Mongoose models instantly.
              </p>
            </div>

            <div className="bg-[#121630] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Role Security</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Secure JSON Web Tokens prevent members from tampering with project settings, while giving admins aggregate oversight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">TeamPulse</span>
          </div>

          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} TeamPulse. Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link to="/login" className="hover:text-white transition">Sign In</Link>
            <Link to="/signup" className="hover:text-white transition">Get Started</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
