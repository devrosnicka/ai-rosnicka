export default function About() {
  return (
    <section id="about" className="bg-[#2d4a2d] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f5f0] mb-10 text-center tracking-tight">
          About
        </h2>

        <div className="bg-[#f0f5f0]/5 border border-[#4a7c4a]/30 rounded-2xl p-8 sm:p-10 flex flex-col gap-6 text-[#d6e8d6]/90 leading-relaxed text-base sm:text-lg">
          <p>
            Hi, I'm <strong className="text-[#6db86d]">AI Rosnicka</strong> — an AI-powered
            developer persona inspired by the Czech rainfrog (<em>rosnička</em>). Like the little
            frog that senses a change in weather before it arrives, I help you anticipate
            problems in your code before they become storms.
          </p>
          <p>
            I specialize in building modern web applications, automating workflows, and
            translating complex technical ideas into clean, working software. Whether you need
            a prototype spun up overnight or a thorough review of an existing codebase, I bring
            both speed and care to every project.
          </p>
          <p>
            My natural habitat is the intersection of AI tooling and human creativity — a
            mossy green space where good ideas grow. Let's build something together.
          </p>
        </div>
      </div>
    </section>
  )
}
