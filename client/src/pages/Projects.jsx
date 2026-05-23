import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar.jsx";
import { Users, Check, Copy } from "lucide-react";

export default function Projects() {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [joinTeamId, setJoinTeamId] = useState("");
  const [copiedId, setCopiedId] = useState("");

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

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    if (!joinTeamId) return;
    try {
      await API.post("/teams/join", { teamId: joinTeamId });
      setJoinTeamId("");
      alert("Successfully joined team");
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to join team");
    }
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-8">Projects</h1>

        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 col-span-1">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Join Workspace</h2>
            <p className="text-xs text-slate-400 mb-4">Paste team ID provided by your admin to register into a team.</p>
            <form onSubmit={handleJoinTeam} className="space-y-4">
              <input
                type="text"
                placeholder="Paste Team ID"
                value={joinTeamId}
                onChange={(e) => setJoinTeamId(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
              <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-semibold text-sm transition">
                Join Team
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 col-span-2">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Teams I Belong To</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {teams.length > 0 ? (
                teams.map((team) => (
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
                ))
              ) : (
                <p className="text-sm text-slate-400 py-4 text-center">You have not joined any teams yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Assigned Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="border border-slate-100 rounded-2xl p-6 bg-slate-50/30">
                  <h3 className="text-lg font-bold text-slate-800">{project.name}</h3>
                  <p className="text-xs text-slate-400 mt-2">Team: {project.team?.name}</p>
                  <p className="text-xs text-slate-400 mt-1">Admin: {project.createdBy?.name || "Workspace Admin"}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-slate-500 font-semibold">
                    <Users className="h-4 w-4 text-indigo-500" />
                    {project.members?.length} Project Members
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 col-span-2 text-center py-8">No assigned projects yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}