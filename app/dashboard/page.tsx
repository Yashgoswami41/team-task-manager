"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";

type Stats = {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      setStats(data);
    }

    loadStats();
  }, []);

  return (
    <AppShell
      title="Dashboard"
      subtitle="Track project volume, task completion, pending work, and overdue items from one command view."
    >
        <div className="grid gap-4 md:grid-cols-5">
          <div className="rounded-lg border border-white/10 bg-white/10 p-5 text-white shadow-xl shadow-violet-950/20 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
            <p className="text-sm font-medium text-violet-100">Projects</p>
            <h2 className="mt-2 text-4xl font-bold text-violet-200">{stats.totalProjects}</h2>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/10 p-5 text-white shadow-xl shadow-violet-950/20 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
            <p className="text-sm font-medium text-violet-100">Total Tasks</p>
            <h2 className="mt-2 text-4xl font-bold text-fuchsia-200">{stats.totalTasks}</h2>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/10 p-5 text-white shadow-xl shadow-violet-950/20 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
            <p className="text-sm font-medium text-violet-100">Completed</p>
            <h2 className="mt-2 text-4xl font-bold text-emerald-300">{stats.completedTasks}</h2>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/10 p-5 text-white shadow-xl shadow-violet-950/20 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
            <p className="text-sm font-medium text-violet-100">Pending</p>
            <h2 className="mt-2 text-4xl font-bold text-amber-300">{stats.pendingTasks}</h2>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/10 p-5 text-white shadow-xl shadow-violet-950/20 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
            <p className="text-sm font-medium text-violet-100">Overdue</p>
            <h2 className="mt-2 text-4xl font-bold text-rose-300">{stats.overdueTasks}</h2>
          </div>
        </div>
    </AppShell>
  );
}
