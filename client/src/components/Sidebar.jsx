// client/src/components/Sidebar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, FolderGit2, CheckSquare, LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const name = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email") || "user@workspace.com";
  const role = localStorage.getItem("role") || "Member";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: role === "Admin" ? "/admin/dashboard" : "/member/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      path: role === "Admin" ? "/admin/projects" : "/member/projects",
      icon: FolderGit2,
    },
    {
      name: "Tasks",
      path: role === "Admin" ? "/admin/tasks" : "/member/tasks",
      icon: CheckSquare,
    },
  ];

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-lg font-bold text-white shadow-md">
        </div>
        <div>
          <h2 className="text-md font-bold tracking-tight text-slate-800">TeamTask</h2>
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">Workspace</span>
        </div>
      </div>

      <nav className="mt-10 flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User profile section */}
      <div className="border-t border-slate-100 pt-6">
        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden w-full">
            <h4 className="truncate text-sm font-semibold text-slate-800" title={name}>{name}</h4>
            <p className="truncate text-xs text-slate-400" title={email}>{email}</p>
            <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
              {role}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-800"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}