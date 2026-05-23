import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import AdminDashboard from "../pages/AdminDashboard";
import MemberDashboard from "../pages/MemberDashboard";

import AdminProjects from "../pages/AdminProjects";
import MemberProjects from "../pages/MemberProjects";

import AdminTasks from "../pages/AdminTasks";
import MemberTasks from "../pages/MemberTasks";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ADMIN */}
      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/projects"
        element={<AdminProjects />}
      />

      <Route
        path="/admin/tasks"
        element={<AdminTasks />}
      />

      {/* MEMBER */}
      <Route
        path="/member/dashboard"
        element={<MemberDashboard />}
      />

      <Route
        path="/member/projects"
        element={<MemberProjects />}
      />

      <Route
        path="/member/tasks"
        element={<MemberTasks />}
      />
    </Routes>
  );
}

export default AppRoutes;