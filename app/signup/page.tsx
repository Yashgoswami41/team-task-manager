"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthVisual } from "@/components/AuthVisual";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
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
      <div className="relative flex min-h-[calc(100vh-48px)] items-center justify-center overflow-hidden rounded-lg bg-[radial-gradient(circle_at_top_right,#7c3aed_0,#281449_34%,#10091f_72%)]">
        <div className="pointer-events-none absolute right-6 top-6 h-24 w-24 rounded-bl-[36px] border-r border-t border-violet-200/30" />
        <div className="pointer-events-none absolute bottom-6 left-6 h-24 w-24 rounded-tr-[36px] border-b border-l border-fuchsia-200/30" />
        <div className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-white/10 shadow-2xl shadow-violet-950/40 backdrop-blur md:grid-cols-2">
          <section className="flex flex-col justify-center p-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-violet-200">
              Start Organized
            </p>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white">
              Create a workspace your team can trust.
            </h1>
            <p className="mb-8 text-lg text-violet-100">
              Every project becomes easier when tasks, owners, and progress live in one clean place.
            </p>
            <AuthVisual quote="Great teams do not guess what is next. They make progress visible, shared, and easy to act on." />
          </section>

          <section className="bg-white p-8 text-slate-900">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-2 text-3xl font-bold">Create account</h1>
              <p className="mb-6 text-slate-500">
                Join as an admin or member and start tracking work today.
              </p>

              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                className="mb-4 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                className="mb-4 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
                placeholder="Your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <label className="mb-1 block text-sm font-medium">Password</label>
              <input
                className="mb-4 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
                placeholder="Create password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <label className="mb-1 block text-sm font-medium">Role</label>
              <select
                className="mb-5 w-full rounded-md border border-slate-300 p-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="MEMBER">Member</option>
                <option value="ADMIN">Admin</option>
              </select>

              <button className="w-full rounded-md bg-violet-700 p-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800 hover:shadow-violet-300 active:translate-y-0">
                Create Account
              </button>
            </form>

            <div className="mt-6 border-t pt-5 text-center">
              <p className="mb-3 text-slate-600">
                Already have an account?
              </p>
              <a
                href="/login"
                className="inline-block w-full rounded-md border border-violet-700 p-3 font-semibold text-violet-700 transition hover:bg-violet-50"
              >
                Login
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
