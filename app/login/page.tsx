"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthVisual } from "@/components/AuthVisual";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-[#10091f] p-6 text-slate-100">
      <div className="relative flex min-h-[calc(100vh-48px)] items-center justify-center overflow-hidden rounded-lg bg-[radial-gradient(circle_at_top_left,#6d28d9_0,#281449_36%,#10091f_70%)]">
        <div className="pointer-events-none absolute left-6 top-6 h-24 w-24 rounded-br-[36px] border-l border-t border-violet-200/30" />
        <div className="pointer-events-none absolute bottom-6 right-6 h-24 w-24 rounded-tl-[36px] border-b border-r border-fuchsia-200/30" />
        <div className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-white/10 shadow-2xl shadow-violet-950/40 backdrop-blur md:grid-cols-2">
          <section className="flex flex-col justify-center p-10 md:p-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-violet-200">
              Team Task Manager
            </p>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white">
              Back to the flow.
          </h1>

          <p className="mb-10 max-w-md text-lg text-violet-100">
            Jump in, check tasks, move work forward.
          </p>

          <AuthVisual quote="Less confusion. More done. That is the vibe." />
        </section>

        <section className="bg-white p-8 text-slate-900 md:p-10">
          <form onSubmit={handleSubmit}>
            <h2 className="mb-2 text-3xl font-bold">Welcome back</h2>
            <p className="mb-8 text-slate-500">
              Your workspace missed you.
            </p>

            <label className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              className="mb-5 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <label className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              className="mb-5 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              placeholder="Enter your password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button className="w-full rounded-md bg-violet-700 p-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800 hover:shadow-violet-300 active:translate-y-0">
              Login
            </button>
          </form>

          <div className="mt-8 border-t pt-6 text-center">
            <p className="mb-4 text-slate-600">
              New here? Start your team space.
            </p>

            <a
              href="/signup"
              className="inline-block w-full rounded-md border border-violet-700 p-3 font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Sign Up
            </a>
          </div>
        </section>
        </div>
      </div>
    </main>
  );
}
