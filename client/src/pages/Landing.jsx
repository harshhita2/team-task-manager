import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Network,
  BarChart3,
  ShieldAlert,
  ArrowRight,
  Play,
  CheckCircle,
  Activity,
  User,
  Clock,
  Sparkles,
  Lock,
  Layers
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

export default function Landing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ai");

  // Sample data for charts
  const activityData = [
    { name: "Mon", tasks: 4 },
    { name: "Tue", tasks: 6 },
    { name: "Wed", tasks: 8 },
    { name: "Thu", tasks: 5 },
    { name: "Fri", tasks: 7 },
    { name: "Sat", tasks: 3 },
    { name: "Sun", tasks: 4 }
  ];

  const delayData = [
    { name: "Week 1", risk: 25 },
    { name: "Week 2", risk: 18 },
    { name: "Week 3", risk: 12 },
    { name: "Week 4", risk: 8 }
  ];

  const features = [
    {
      id: "ai",
      label: "AI Decision Assistant",
      icon: Brain,
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: "delay",
      label: "Delay Prediction",
      icon: TrendingUp,
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: "dependency",
      label: "Dependency Graph",
      icon: Network,
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: "behavioral",
      label: "Behavioral Analytics",
      icon: BarChart3,
      color: "from-amber-500 to-orange-500"
    },
    {
      id: "rbac",
      label: "RBAC Permissions",
      icon: ShieldAlert,
      color: "from-rose-500 to-pink-500"
    }
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
              NeuroFlow
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#how-it-works" className="hover:text-white transition">How it works</a>
            <a href="#intelligence" className="hover:text-white transition">Intelligence</a>
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
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>AI-Powered Project Intelligence</span>
          <ArrowRight className="h-3 w-3" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] mb-6">
          Your team's{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            smartest
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
          co-pilot
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          NeuroFlow combines AI predictions, behavioral analytics, and dependency intelligence to keep your projects on track — before problems even happen.
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
            <Play className="h-4 w-4 text-indigo-400 fill-indigo-400/25" />
            <span>Sign In</span>
          </Link>
        </div>

        {/* Feature Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 max-w-5xl mx-auto mb-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = activeTab === feature.id;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition duration-200 ${
                  isActive
                    ? "bg-white/10 text-white shadow-md border border-white/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                <span>{feature.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Mockup Panel */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-[#0c0f21]/80 shadow-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden text-left min-h-[450px]">
          {/* Glass background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {activeTab === "ai" && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {/* Left/Middle content */}
                <div className="md:col-span-2 space-y-6">
                  {/* Task activity bar chart */}
                  <div className="bg-[#121630] border border-white/5 rounded-2xl p-5 shadow-lg">
                    <h3 className="text-sm font-semibold text-slate-400 mb-4 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-indigo-400" />
                      Task Activity
                    </h3>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityData}>
                          <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip
                            contentStyle={{ background: "#0c0f21", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                            labelStyle={{ color: "#94a3b8" }}
                          />
                          <Bar dataKey="tasks" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* AI Insight Box */}
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-5 flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 mt-0.5">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-indigo-300 mb-1">AI Recommendation Insight</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Sprint 4 is currently on track. However, 2 critical tasks are approaching their deadlines.
                        We suggest reassigning <span className="font-semibold text-white">"API rate-limiting"</span> to <span className="font-semibold text-indigo-300">Sarah Jenkins</span> to distribute load.
                      </p>
                      <span className="inline-block mt-3 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        92% confidence
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side: AI Assistant overlay and task lists */}
                <div className="space-y-6">
                  {/* Floating AI Assistant Alert */}
                  <div className="bg-gradient-to-b from-[#181d3d] to-[#121630] border border-indigo-500/35 rounded-2xl p-5 shadow-2xl relative">
                    <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                      <Sparkles className="h-4 w-4 text-indigo-400" />
                      AI Assistant
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Reassign <span className="font-semibold text-indigo-300">"Auth Module"</span> to reduce sprint bottleneck risk by <span className="font-bold text-emerald-400">40%</span>.
                    </p>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/25"
                    >
                      Apply Reassignment
                    </button>
                  </div>

                  {/* Tasks List */}
                  <div className="bg-[#121630] border border-white/5 rounded-2xl p-5">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Upcoming Tasks</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs font-medium text-slate-200 truncate max-w-[150px]">API Rate Limiting</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/25">High</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs font-medium text-slate-200 truncate max-w-[150px]">Design System Migration</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/25">Medium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "delay" && (
              <motion.div
                key="delay"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {/* Left/Middle content */}
                <div className="md:col-span-2 space-y-6">
                  {/* Area Chart: Delay Risk Over Time */}
                  <div className="bg-[#121630] border border-white/5 rounded-2xl p-5 shadow-lg">
                    <h3 className="text-sm font-semibold text-slate-400 mb-4 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-400" />
                      Sprint Delay Risk Projection
                    </h3>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={delayData}>
                          <defs>
                            <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip
                            contentStyle={{ background: "#0c0f21", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                            labelStyle={{ color: "#94a3b8" }}
                          />
                          <Area type="monotone" dataKey="risk" stroke="#a855f7" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Delay prediction analysis details */}
                  <div className="bg-purple-950/20 border border-purple-500/20 rounded-2xl p-5 flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 mt-0.5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-purple-300 mb-1">Delay Prediction Engine</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        By training on past task complexity, assignees, and pull request review times, NeuroFlow models delivery deadlines. This prevents overcommitment and guarantees sprint schedules.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right side: Delay Metrics Cards */}
                <div className="space-y-6">
                  {/* Status Card */}
                  <div className="bg-[#121630] border border-white/5 rounded-2xl p-5 text-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Current Sprint Status</span>
                    <div className="text-3xl font-extrabold text-emerald-400 mb-1">On Track</div>
                    <p className="text-xs text-slate-400">Delay Risk: <span className="text-emerald-400 font-bold">8%</span> (Very Low)</p>
                  </div>

                  {/* Statistics Metrics */}
                  <div className="bg-[#121630] border border-white/5 rounded-2xl p-5 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                        <span>Sprint Completion Probability</span>
                        <span className="text-slate-200 font-semibold">94%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: "94%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                        <span>Resource Allocation Balance</span>
                        <span className="text-slate-200 font-semibold">88%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: "88%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "dependency" && (
              <motion.div
                key="dependency"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* SVG Dependency Graph mockup */}
                <div className="bg-[#121630] border border-white/5 rounded-2xl p-6 shadow-lg min-h-[300px] flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 flex items-center gap-2 mb-6">
                      <Network className="h-4 w-4 text-emerald-400" />
                      Task Dependency Graph Mapping
                    </h3>
                  </div>

                  {/* Interactive node grid */}
                  <div className="flex flex-col md:flex-row items-center justify-around gap-8 relative py-4">
                    {/* SVG Connector Lines */}
                    <svg className="absolute inset-0 w-full h-full hidden md:block pointer-events-none">
                      <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                        </marker>
                      </defs>
                      <path d="M 230 75 L 375 75" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                      <path d="M 525 75 L 675 75" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                    </svg>

                    {/* Node 1 */}
                    <div className="bg-[#0c0f21] border border-emerald-500/30 px-5 py-4 rounded-xl shadow-xl w-60 z-10 hover:border-emerald-400 transition">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1 tracking-wider">Dependency Root</div>
                      <h4 className="text-sm font-bold text-white mb-2">1. Database Schema</h4>
                      <p className="text-xs text-slate-400">Owner: Admin</p>
                      <span className="inline-block mt-3 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-medium">Completed</span>
                    </div>

                    {/* Node 2 */}
                    <div className="bg-[#0c0f21] border border-indigo-500/20 px-5 py-4 rounded-xl shadow-xl w-60 z-10 hover:border-indigo-400 transition">
                      <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1 tracking-wider">Blocked By Node 1</div>
                      <h4 className="text-sm font-bold text-white mb-2">2. Auth REST API</h4>
                      <p className="text-xs text-slate-400">Owner: Sarah J.</p>
                      <span className="inline-block mt-3 text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-medium">In Progress</span>
                    </div>

                    {/* Node 3 */}
                    <div className="bg-[#0c0f21] border border-slate-700 px-5 py-4 rounded-xl shadow-xl w-60 z-10 hover:border-slate-500 transition">
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-wider">Blocked By Node 2</div>
                      <h4 className="text-sm font-bold text-white mb-2">3. Login Form Integration</h4>
                      <p className="text-xs text-slate-400">Owner: Alex M.</p>
                      <span className="inline-block mt-3 text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-medium">To Do</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                    Identify bottlenecks before coding begins. The visual dependency tracker highlights which task completions block future scope items, so admins can adjust priorities instantly.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "behavioral" && (
              <motion.div
                key="behavioral"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Team Behavioral metrics */}
                <div className="bg-[#121630] border border-white/5 rounded-2xl p-6 shadow-lg space-y-6">
                  <h3 className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-amber-400" />
                    Sprint Behavioral Dashboard
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                        <span>Developer Work Delivery Speed</span>
                        <span className="font-semibold text-amber-400">82%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full" style={{ width: "82%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                        <span>Team Coding Focus</span>
                        <span className="font-semibold text-amber-400">91%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full" style={{ width: "91%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                        <span>Deadline Punctuality Rate</span>
                        <span className="font-semibold text-amber-400">76%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full" style={{ width: "76%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* What it means box */}
                <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      Smart Resource Balancing
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Evaluate workloads rather than raw hours. Behavioral metrics combine velocity metrics and schedule compliance trends to highlight burned-out developers or underutilized talent.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <User className="h-4 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Admin Recommendation</div>
                      <div className="text-[11px] text-slate-400">Rebalance tasks for 3 overloaded developers</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "rbac" && (
              <motion.div
                key="rbac"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Admin Role Column */}
                <div className="bg-gradient-to-b from-[#181d3d] to-[#121630] border border-white/10 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide flex items-center gap-2">
                      <Lock className="h-4 w-4 text-indigo-400" />
                      Role: Admin Dashboard
                    </h3>
                    <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">Owner</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Create, edit, and delete workspace teams",
                      "Scope projects and assign member participants",
                      "Access aggregate risk & analytics charts",
                      "Manage global task creation & deletion"
                    ].map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Member Role Column */}
                <div className="bg-gradient-to-b from-[#181d3d] to-[#121630] border border-white/10 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                      <User className="h-4 w-4 text-purple-400" />
                      Role: Member Dashboard
                    </h3>
                    <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">Collaborator</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Restricted access: view assigned tasks only",
                      "Drag-and-drop interactive Kanban board",
                      "Update task status (Todo, In Progress, Done)",
                      "Collaborate inside scoped team workspaces"
                    ].map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Section */}
      <section id="intelligence" className="py-20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-indigo-400 mb-2">21%</div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">faster project delivery</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-purple-400 mb-2">0x</div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">overdue sprints</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-emerald-400 mb-2">13%</div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">less time in meetings</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-amber-400 mb-2">29%</div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">higher goal achievement</p>
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
              Eliminate sheets and endless status tracking. NeuroFlow gives your workspace real-time metrics, Kanban ease, and active risk prediction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#121630] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Smart Scoping</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Admins scope projects, select and assign teams, and partition task ownership in minutes with structured, secure endpoints.
              </p>
            </div>

            <div className="bg-[#121630] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Interactive Kanban</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Drag, drop, or select task columns directly. Workload boards sync client-side states with our Express server in real-time.
              </p>
            </div>

            <div className="bg-[#121630] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Network className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Role Security</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                JSON Web Token credentials guard critical project boundaries. Members edit assignments, admins audit metric charts.
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
            <span className="text-lg font-bold text-white">NeuroFlow</span>
          </div>

          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} NeuroFlow. Inc. All rights reserved.
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
