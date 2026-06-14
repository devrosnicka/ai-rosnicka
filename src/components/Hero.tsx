export default function Hero() {
  return (
    <section className="hero-bg min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center gap-8 max-w-2xl text-center">
        <div className="relative">
          <div className="w-44 h-44 rounded-full p-1 bg-gradient-to-br from-[#6db86d] via-[#4a7c4a] to-[#2d4a2d] shadow-2xl">
            <img
              src={`${import.meta.env.BASE_URL}avatar.png`}
              alt="AI Rosnicka avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-[#f0f5f0] drop-shadow-lg">
            AI Rosnicka
          </h1>
          <p className="text-lg sm:text-xl text-[#6db86d] font-medium tracking-wide">
            Your AI developer companion
          </p>
          <p className="text-base text-[#d6e8d6]/70 italic">
            Built in the wetlands, thinking in code.
          </p>
        </div>

        <a
          href="#about"
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#4a7c4a] text-[#6db86d] hover:bg-[#4a7c4a]/20 transition-colors duration-200 text-sm font-medium"
        >
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
