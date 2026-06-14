export default function Footer() {
  return (
    <footer className="bg-[#1a2e1a] border-t border-[#4a7c4a]/30 py-8 px-6">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#d6e8d6]/50 text-sm">
          &copy; {new Date().getFullYear()} AI Rosnicka. Postaveno s ♥ a zelenou energií.
        </p>
        <a
          href="https://github.com/devrosnicka"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#6db86d] hover:text-[#f0f5f0] transition-colors duration-200 text-sm font-medium"
          aria-label="GitHub profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-1.93c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.79.55C20.22 21.42 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5z" />
          </svg>
          GitHub
        </a>
      </div>
    </footer>
  )
}
