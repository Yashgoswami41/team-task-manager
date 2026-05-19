"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { formatIndianDate } from "@/lib/formatDate";

type Project = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  tasks: {
    id: string;
    status: string;
    assigneeId: string | null;
  }[];
  owner: {
    name: string;
    email: string;
  };
};

type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  async function loadProjects() {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  }

  async function createProject(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    setForm({ name: "", description: "" });
    loadProjects();
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const isAdmin = currentUser?.role === "ADMIN";

  const visibleProjects = isAdmin
    ? projects
    : projects.filter((project) =>
        project.tasks.some((task) => task.assigneeId === currentUser?.id)
      );

  function getMemberStats(project: Project) {
    const myTasks = project.tasks.filter(
      (task) => task.assigneeId === currentUser?.id
    );
    const completed = myTasks.filter((task) => task.status === "DONE").length;
    const pending = myTasks.length - completed;
    const progress = myTasks.length
      ? Math.round((completed / myTasks.length) * 100)
      : 0;

    return {
      myTasks: myTasks.length,
      completed,
      pending,
      progress,
    };
  }

  return (
    <AppShell
      title={isAdmin ? "Projects" : "Project Overview"}
      subtitle={
        isAdmin
          ? "Create project spaces, keep ownership visible, and connect every task to the right initiative."
          : "See projects connected to your assigned work and track your contribution."
      }
    >
      {isAdmin && (
        <form onSubmit={createProject} className="mb-6 rounded-lg border border-white/10 bg-white/10 p-5 text-white shadow-xl shadow-violet-950/20 backdrop-blur">
          <h2 className="mb-4 text-xl font-semibold">Create Project</h2>

          <input
            className="mb-3 w-full rounded-md border border-white/10 bg-slate-950/40 p-3 text-white outline-none transition placeholder:text-violet-200/70 focus:border-violet-300 focus:ring-4 focus:ring-violet-500/20"
            placeholder="Project name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <textarea
            className="mb-4 min-h-28 w-full rounded-md border border-white/10 bg-slate-950/40 p-3 text-white outline-none transition placeholder:text-violet-200/70 focus:border-violet-300 focus:ring-4 focus:ring-violet-500/20"
            placeholder="Project description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button className="rounded-md bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-fuchsia-600">
            Create Project
          </button>
        </form>
      )}

        <div className="grid gap-4 md:grid-cols-2">
          {visibleProjects.map((project) => {
            const memberStats = getMemberStats(project);

            return (
            <div key={project.id} className="rounded-lg border border-white/10 bg-white/10 p-5 text-white shadow-xl shadow-violet-950/20 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
              <h2 className="text-xl font-semibold text-white">{project.name}</h2>
              <p className="mt-2 text-violet-100">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="rounded-md bg-violet-500/15 px-3 py-1 text-violet-100">Owner: {project.owner.name}</span>
                <span className="rounded-md bg-emerald-400/15 px-3 py-1 text-emerald-100">Tasks: {project.tasks.length}</span>
                <span className="rounded-md bg-white/10 px-3 py-1 text-slate-200">Created: {formatIndianDate(project.createdAt)}</span>
              </div>

              {!isAdmin && (
                <div className="mt-5 rounded-lg border border-white/10 bg-slate-950/30 p-4">
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div>
                      <p className="text-2xl font-bold text-violet-200">{memberStats.myTasks}</p>
                      <p className="text-violet-100">My Tasks</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-300">{memberStats.completed}</p>
                      <p className="text-violet-100">Done</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-300">{memberStats.pending}</p>
                      <p className="text-violet-100">Pending</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex justify-between text-sm text-violet-100">
                      <span>My Progress</span>
                      <span>{memberStats.progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                        style={{ width: `${memberStats.progress}%` }}
                      />
                    </div>
                  </div>

                  <a
                    className="mt-4 inline-flex rounded-md border border-violet-200/40 px-4 py-2 text-sm font-semibold text-violet-100 transition hover:bg-white/10"
                    href="/tasks"
                  >
                    View My Tasks
                  </a>
                </div>
              )}
            </div>
          )})}

          {visibleProjects.length === 0 && (
            <p className="rounded-lg border border-white/10 bg-white/10 p-5 text-violet-100">
              No projects connected to your assigned tasks yet.
            </p>
          )}
        </div>
    </AppShell>
  );
}
