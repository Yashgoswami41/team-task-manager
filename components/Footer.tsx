export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 pt-5 text-center text-sm text-violet-100">
      <p>
        © 2026 Team Task Manager. Built by Yash Goswami.
      </p>
      <div className="mt-2 flex justify-center gap-4">
        <a
          className="transition hover:text-white"
          href="https://www.linkedin.com/in/yash-goswami-457944258"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="transition hover:text-white"
          href="https://github.com/Yashgoswami41"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
