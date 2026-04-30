export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#10091f] p-6 text-white">
      <section className="w-full max-w-3xl rounded-lg border border-white/10 bg-white/10 p-10 text-center shadow-2xl shadow-violet-950/40 backdrop-blur">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-violet-200">
          Team Task Manager
        </p>
        <h1 className="mb-4 text-4xl font-bold">Manage projects with sharper focus.</h1>
        <p className="mx-auto mb-8 max-w-xl text-violet-100">
          Create projects, assign work, track status, and keep every role aligned from one modern workspace.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a className="rounded-md bg-violet-600 px-5 py-3 font-semibold transition hover:-translate-y-0.5 hover:bg-violet-700" href="/login">
            Login
          </a>
          <a className="rounded-md border border-violet-200 px-5 py-3 font-semibold text-violet-100 transition hover:bg-white/10" href="/signup">
            Create Account
          </a>
        </div>
      </section>
    </main>
  );
}
