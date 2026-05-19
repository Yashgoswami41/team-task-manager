"use client";

import { useEffect, useState } from "react";

const activity = [
  "Riya moved Dashboard API to Done",
  "Admin assigned Review UI to Member",
  "Project Sprint Board is 72% complete",
];

export default function Home() {
  const [mouse, setMouse] = useState({ x: 50, y: 40 });
  const [activeActivity, setActiveActivity] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveActivity((current) => (current + 1) % activity.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main
      className="min-h-screen overflow-hidden bg-[#0c0618] text-white"
      onMouseMove={(event) => {
        setMouse({
          x: (event.clientX / window.innerWidth) * 100,
          y: (event.clientY / window.innerHeight) * 100,
        });
      }}
      style={{
        background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(168,85,247,0.16), transparent 12%), #0c0618`,
      }}
    >
      <section className="relative flex min-h-screen items-center px-5 py-16">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-35" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="brand-pill mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/10 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-violet-50 backdrop-blur">
              <span className="rounded-full bg-violet-500 px-2 py-1 text-xs text-white shadow-lg shadow-violet-900/40">
                TTM
              </span>
              Team Task Manager
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white md:text-7xl">
              Work moves better when everyone sees the plan.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-violet-100">
              Create projects, assign tasks, track deadlines, and keep team progress alive in one focused workspace.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                className="rounded-md bg-violet-600 px-6 py-3 font-semibold text-white shadow-xl shadow-violet-900/40 transition hover:-translate-y-1 hover:bg-fuchsia-600"
                href="/login"
              >
                Login
              </a>
              <a
                className="rounded-md border border-violet-200/50 bg-white/10 px-6 py-3 font-semibold text-violet-50 backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
                href="/signup"
              >
                Create Account
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3 text-sm text-violet-100">
              <span className="rounded-md border border-white/10 bg-white/10 px-3 py-2">
                Admin + Member roles
              </span>
              <span className="rounded-md border border-white/10 bg-white/10 px-3 py-2">
                Live task status
              </span>
              <span className="rounded-md border border-white/10 bg-white/10 px-3 py-2">
                Deadline tracking
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-2xl shadow-violet-950/50 backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
                    Live Preview
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">Dashboard Pulse</h2>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
                  Online
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Projects", "08", "text-violet-300"],
                  ["Tasks", "26", "text-fuchsia-300"],
                  ["Done", "17", "text-emerald-300"],
                ].map((item) => (
                  <div key={item[0]} className="rounded-lg border border-white/10 bg-white/10 p-4">
                    <p className="text-sm text-violet-200">{item[0]}</p>
                    <p className={`mt-2 text-3xl font-bold ${item[2]}`}>{item[1]}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-white/10 bg-white/10 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-semibold">Weekly Progress</p>
                  <p className="text-sm text-violet-200">Updating live</p>
                </div>
                <div className="flex h-36 items-end gap-3">
                  {[42, 74, 58, 88, 66, 92, 78].map((height, index) => (
                    <div key={height} className="flex flex-1 items-end">
                      <div
                        className="dashboard-bar w-full rounded-t-md bg-gradient-to-t from-violet-700 to-fuchsia-300"
                        style={{
                          height: `${height}%`,
                          animationDelay: `${index * 0.18}s`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-white/10 p-4">
                <p className="mb-2 text-sm font-semibold text-violet-200">Realtime Activity</p>
                <p className="activity-pop text-white">{activity[activeActivity]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3">
        {[
          ["Create", "Turn projects into clear workspaces."],
          ["Assign", "Give every task an owner and deadline."],
          ["Track", "Watch status move from todo to done."],
        ].map((card) => (
          <div
            key={card[0]}
            className="scroll-card rounded-lg border border-white/10 bg-white/10 p-6 shadow-xl shadow-violet-950/20 backdrop-blur transition hover:-translate-y-2 hover:bg-white/15"
          >
            <h3 className="text-2xl font-bold">{card[0]}</h3>
            <p className="mt-3 text-violet-100">{card[1]}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
