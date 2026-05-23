import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import { Users, Copy, Check } from "lucide-react";

export default function AdminProjects() {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [joinTeamId, setJoinTeamId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [copiedId, setCopiedId] = useState("");

  const [activeProject, setActiveProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const teamRes = await API.get("/teams");
      setTeams(teamRes.data);
      const projRes = await API.get("/projects");
      setProjects(projRes.data);
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

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamName) return;
    try {
      await API.post("/teams", { name: teamName });
      setTeamName("");
      alert("Team created successfully");
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to create team");
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    if (!joinTeamId) return;
    try {
      await API.post("/teams/join", { teamId: joinTeamId });
      setJoinTeamId("");
      alert("Joined team successfully");
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to join team");
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName || !selectedTeamId) return;
    try {
      await API.post("/projects", { name: projectName, teamId: selectedTeamId });
      setProjectName("");
      setSelectedTeamId("");
      alert("Project created successfully");
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const openMemberManager = async (project) => {
    setActiveProject(project);
    try {
      const membersRes = await API.get(`/teams/${project.team._id}/members`);
      setTeamMembers(membersRes.data);
      const projMembersRes = await API.get(`/projects/${project._id}/members`);
      setProjectMembers(projMembersRes.data.map((m) => m._id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleProjectMember = async (userId) => {
    if (!activeProject) return;
    const isMember = projectMembers.includes(userId);
    try {
      if (isMember) {
        await API.delete(`/projects/${activeProject._id}/members/${userId}`);
        setProjectMembers(projectMembers.filter((id) => id !== userId));
      } else {
        await API.post(`/projects/${activeProject._id}/members`, { userId });
        setProjectMembers([...projectMembers, userId]);
      }
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update member status");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-8">Workspaces & Projects</h1>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Teams setup */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Create Team</h2>
            <form onSubmit={handleCreateTeam} className="flex gap-3">
              <input
                type="text"
                placeholder="Marketing Team, Devs Team..."
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl font-semibold text-sm transition">
                Create
              </button>
            </form>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Or Join Team</h2>
            <form onSubmit={handleJoinTeam} className="flex gap-3">
              <input
                type="text"
                placeholder="Enter workspace team ID"
                value={joinTeamId}
                onChange={(e) => setJoinTeamId(e.target.value)}
                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
              <button type="submit" className="bg-slate-800 hover:bg-slate-900 text-white px-6 rounded-xl font-semibold text-sm transition">
                Join
              </button>
            </form>
          </div>

          {/* Projects setup */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Create Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400">Project Name</label>
                <input
                  type="text"
                  placeholder="App Redesign, Beta Launch..."
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Select Team</label>
                <select
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 bg-white"
                >
                  <option value="">Select which team owns this project</option>
                  {teams.map((t) => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold text-sm transition">
                Launch Project
              </button>
            </form>
          </div>
        </div>

        {/* Lists */}
        <div className="grid grid-cols-2 gap-8">
          {/* Teams list */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Your Teams</h2>
            <div className="space-y-3">
              {teams.map((team) => (
                <div key={team._id} className="border border-slate-100 rounded-2xl p-4 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h3 className="font-bold text-slate-800">{team.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      ID: {team._id}
                      <button onClick={() => copyToClipboard(team._id)} className="text-indigo-500 hover:text-indigo-700 ml-1">
                        {copiedId === team._id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </p>
                  </div>
                  <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                    {team.members?.length} Members
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects list */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Projects</h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project._id} className="border border-slate-100 rounded-2xl p-4 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h3 className="font-bold text-slate-800">{project.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">Team: {project.team?.name}</p>
                  </div>
                  <button
                    onClick={() => openMemberManager(project)}
                    className="flex items-center gap-1 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-2 rounded-xl transition"
                  >
                    <Users className="h-3.5 w-3.5" />
                    Manage Members ({project.members?.length})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Manage members modal */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Project Members</h3>
                <button onClick={() => setActiveProject(null)} className="text-slate-400 hover:text-slate-600 text-sm font-semibold">Close</button>
              </div>
              <p className="text-xs text-slate-400 mb-4">Add or remove members of the team "{activeProject.team?.name}" to project "{activeProject.name}".</p>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {teamMembers.map((member) => {
                  const isChecked = projectMembers.includes(member._id);
                  return (
                    <div key={member._id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl border border-slate-50">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.email}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleProjectMember(member._id)}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}