"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { formatIndianDate } from "@/lib/formatDate";

type Project = {
  id: string;
  name: string;
  role: "Admin" | "Member";
  description: string | null;
  createdAt: string;
  tasks: { id: string }[];
  owner: {
    name: string;
    email: string;
  };
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  async function loadProjects() {
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

  return (
    <AppShell
      title="Projects"
      subtitle="Create project spaces, keep ownership visible, and connect every task to the right initiative."
    >
        <form onSubmit={createProject} className="mb-6 rounded-lg border border-white/10 bg-white/95 p-5 text-slate-900 shadow-xl shadow-violet-950/20">
          <h2 className="mb-4 text-xl font-semibold">Create Project</h2>

          <input
            className="mb-3 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
            placeholder="Project name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <textarea
            className="mb-4 min-h-28 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
            placeholder="Project description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button className="rounded-md bg-violet-700 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800">
            Create Project
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="rounded-lg border border-white/10 bg-white/95 p-5 text-slate-900 shadow-xl shadow-violet-950/20 transition hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-violet-900">{project.name}</h2>
              <p className="mt-2 text-slate-600">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="text-violet-800">
  Owner: {project.owner.name} - {project.role}
</span>
                <span className="rounded-md bg-emerald-100 px-3 py-1 text-emerald-800">Tasks: {project.tasks.length}</span>
                <span className="rounded-md bg-slate-100 px-3 py-1 text-slate-700">Created: {formatIndianDate(project.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
    </AppShell>
  );
}
