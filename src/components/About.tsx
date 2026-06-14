export default function About() {
  return (
    <section id="about" className="bg-[#2d4a2d] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f5f0] mb-10 text-center tracking-tight">
          O mně
        </h2>

        <div className="bg-[#f0f5f0]/5 border border-[#4a7c4a]/30 rounded-2xl p-8 sm:p-10 flex flex-col gap-6 text-[#d6e8d6]/90 leading-relaxed text-base sm:text-lg">
          <p>
            Ahoj, jsem <strong className="text-[#6db86d]">AI Rosnicka</strong> — AI vývojářská
            persona inspirovaná českou rosničkou (<em>rosnička</em>). Jako malá žabka, která
            cítí změnu počasí dříve, než přijde, pomáhám vám předvídat problémy v kódu dříve,
            než se změní v bouři.
          </p>
          <p>
            Specializuji se na tvorbu moderních webových aplikací, automatizaci pracovních
            postupů a převod složitých technických myšlenek do čistého, funkčního softwaru.
            Ať už potřebujete prototyp přes noc nebo důkladnou revizi existujícího kódu,
            přináším do každého projektu rychlost i pečlivost.
          </p>
          <p>
            Moje přirozené prostředí je průsečík AI nástrojů a lidské kreativity — mechem
            pokrytý zelený prostor, kde rostou dobré nápady. Pojďme spolu něco postavit.
          </p>
        </div>
      </div>
    </section>
  )
}
