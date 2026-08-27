"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";

type AppShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AppShell({ title, subtitle, children }: AppShellProps) {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  const profileInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#10091f] text-slate-100">
      <div className="relative min-h-screen overflow-hidden bg-[#0c0618]">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-25" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-6">
          <nav className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/10 px-5 py-4 shadow-2xl shadow-violet-950/30 backdrop-blur">
            <a href="/dashboard" className="group flex items-center gap-3 text-lg font-bold tracking-wide text-white">
              <span className="relative grid h-9 w-9 place-items-center rounded-md bg-violet-500 shadow-lg shadow-violet-800/40 transition group-hover:rotate-6 group-hover:bg-fuchsia-500">
                <span className="absolute top-2 h-2.5 w-2.5 rounded-full bg-white" />
                <span className="absolute bottom-2 h-3.5 w-5 rounded-t-full bg-white" />
                <span className="absolute right-1.5 top-3 h-2 w-2 rounded-full bg-violet-100/80" />
                <span className="absolute bottom-2 right-1 h-2.5 w-3 rounded-t-full bg-violet-100/80" />
              </span>
              <span>Team Task Manager</span>
            </a>

            <div className="flex flex-wrap items-center gap-2">
              <a className="rounded-md px-4 py-2 text-sm font-medium text-violet-100 transition hover:bg-white/10 hover:text-white" href="/dashboard">
                Dashboard
              </a>
              <a className="rounded-md px-4 py-2 text-sm font-medium text-violet-100 transition hover:bg-white/10 hover:text-white" href="/projects">
                Projects
              </a>
              <a className="rounded-md px-4 py-2 text-sm font-medium text-violet-100 transition hover:bg-white/10 hover:text-white" href="/tasks">
                Tasks
              </a>
              <div className="flex flex-wrap items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-3 py-2 shadow-lg shadow-violet-950/20 backdrop-blur">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-black text-white shadow-lg shadow-violet-950/40">
                  {profileInitial}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {user?.name || "User"}
                  </p>
                  <p className="max-w-40 truncate text-xs text-violet-200">
                    {user?.email || "user@example.com"}
                  </p>
                  <span className="mt-1 inline-flex rounded-md bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-100">
                    {user?.role || "Role"}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="rounded-md border border-rose-300/40 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>

          <header className="mb-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">
              Workspace Control
            </p>
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            <p className="mt-3 max-w-2xl text-slate-300">{subtitle}</p>
          </header>

          {children}

          <Footer />
        </div>
      </div>
    </main>
  );
}
