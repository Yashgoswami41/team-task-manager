"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { formatIndianDate } from "@/lib/formatDate";

type Project = {
  id: string;
  name: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  dueDate: string | null;
  createdAt: string;
  project: Project;
  assignee: User | null;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    assigneeId: "",
    dueDate: "",
  });

  async function loadData() {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    const taskRes = await fetch("/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const taskData = await taskRes.json();

    if (taskRes.ok) {
      setTasks(taskData);
    }

    const projectRes = await fetch("/api/projects");
    const projectData = await projectRes.json();
    setProjects(projectData);

    const userRes = await fetch("/api/users");
    const userData = await userRes.json();
    setUsers(userData);
  }

  async function createTask(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("/api/tasks", {
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

    setForm({
      title: "",
      description: "",
      projectId: "",
      assigneeId: "",
      dueDate: "",
    });

    loadData();
  }

  async function updateStatus(taskId: string, status: string) {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/tasks", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        taskId,
        status,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  const isAdmin = currentUser?.role === "ADMIN";

  return (
    <AppShell
      title="Tasks"
      subtitle={isAdmin ? "Create, assign, and monitor work across the team." : "Review your assigned work and keep progress updated."}
    >
        {isAdmin && (
          <form onSubmit={createTask} className="mb-6 rounded-lg border border-white/10 bg-white/95 p-5 text-slate-900 shadow-xl shadow-violet-950/20">
            <h2 className="mb-4 text-xl font-semibold">Create Task</h2>

            <input
              className="mb-3 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              placeholder="Task title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              className="mb-3 min-h-24 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              placeholder="Task description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <select
              className="mb-3 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              value={form.projectId}
              onChange={(e) =>
                setForm({ ...form, projectId: e.target.value })
              }
            >
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            <select
              className="mb-3 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              value={form.assigneeId}
              onChange={(e) =>
                setForm({ ...form, assigneeId: e.target.value })
              }
            >
              <option value="">Assign to member</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.role}
                </option>
              ))}
            </select>
            
            <label className="mb-1 block text-sm font-medium text-slate-600">
  Deadline
</label>

            <input
              className="mb-4 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
            />

            <button className="rounded-md bg-violet-700 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800">
              Create Task
            </button>
          </form>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {tasks.map((task) => (
            <div key={task.id} className="rounded-lg border border-white/10 bg-white/95 p-5 text-slate-900 shadow-xl shadow-violet-950/20 transition hover:-translate-y-1">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold text-violet-900">{task.title}</h2>
                <span className="rounded-md bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-800">
                  {task.status}
                </span>
              </div>
              <p className="text-slate-600">{task.description}</p>
              <div className="mt-4 space-y-1 text-sm text-slate-600">
                <p>Project: {task.project.name}</p>
                <p>Assigned To: {task.assignee ? task.assignee.name : "Unassigned"}</p>
                <p>Created: {formatIndianDate(task.createdAt)}</p>
                <p>Due Date: {task.dueDate ? formatIndianDate(task.dueDate) : "No due date"}</p>
              </div>

              <div className="mt-3">
                <label className="mb-1 block text-sm font-medium">Status</label>
                <select
                  className="rounded-md border border-slate-300 p-2 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task.id, e.target.value)
                  }
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <p className="rounded-lg border border-white/10 bg-white/10 p-5 text-violet-100">
              No tasks found.
            </p>
          )}
        </div>
    </AppShell>
  );
}
