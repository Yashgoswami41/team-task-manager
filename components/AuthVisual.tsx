type AuthVisualProps = {
  quote: string;
};

export function AuthVisual({ quote }: AuthVisualProps) {
  return (
    <div className="relative mt-8 overflow-hidden rounded-lg border border-white/10 bg-slate-950/35 p-5 shadow-2xl shadow-violet-950/30">
      <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-fuchsia-500/20 blur-2xl" />
      <div className="absolute bottom-4 left-4 h-24 w-24 rounded-full bg-violet-400/20 blur-2xl" />

      <div className="relative mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
            Team flow
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">Today Board</h3>
        </div>
        <span className="rounded-md bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
          Live
        </span>
      </div>

      <div className="relative grid gap-4 sm:grid-cols-3">
        {[
          ["Plan", "Design UI", "2 tasks", "bg-amber-300"],
          ["Build", "APIs", "4 tasks", "bg-violet-300"],
          ["Ship", "Demo", "6 tasks", "bg-emerald-300"],
        ].map((column, index) => (
          <div
            key={column[0]}
            className="auth-float rounded-lg border border-white/10 bg-white/10 p-3"
            style={{ animationDelay: `${index * 0.25}s` }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${column[3]}`} />
              <p className="text-sm font-semibold text-white">{column[0]}</p>
            </div>
            <div className="space-y-2">
              <div className="rounded-md bg-white/90 p-3 text-slate-900 shadow-lg">
                <p className="text-sm font-semibold">{column[1]}</p>
                <p className="mt-1 text-xs text-slate-500">{column[2]}</p>
              </div>
              <div className="h-3 rounded-full bg-white/20" />
              <div className="h-3 w-2/3 rounded-full bg-white/20" />
            </div>
          </div>
        ))}
      </div>

      <p className="relative mt-6 rounded-md border border-violet-200/20 bg-violet-500/10 p-4 text-sm leading-6 text-violet-50">
        {quote}
      </p>
    </div>
  );
}
