export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#111114]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="bg-[#1c1c21] border border-[#2e2e35] rounded-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#fafafa] mb-6 tracking-tight">
            About Holocron Archives
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-[#d4d4d8] mb-6 leading-relaxed">
              Welcome to the Holocron Archives—a comprehensive database dedicated to exploring the rich history, characters, battles, and lore of the Star Wars universe.
            </p>

            <h2 className="text-2xl font-semibold text-[#fafafa] mt-8 mb-4 tracking-tight">
              What is a Holocron?
            </h2>
            <p className="text-[#d4d4d8] mb-6 leading-relaxed">
              In Star Wars lore, a Holocron is an ancient information-storage device used by both the Jedi and the Sith to preserve knowledge across generations. These mystical artifacts contain teachings, history, and wisdom from Force users throughout the galaxy's history.
            </p>

            <h2 className="text-2xl font-semibold text-[#fafafa] mt-8 mb-4 tracking-tight">
              Our Mission
            </h2>
            <p className="text-[#d4d4d8] mb-6 leading-relaxed">
              This site serves as a digital Holocron for fans of Star Wars—a place to discover detailed articles about legendary characters like Darth Revan and Ahsoka Tano, pivotal battles like Endor and Malachor, iconic ships like the Millennium Falcon, and the deep philosophical lore that makes Star Wars more than just space fantasy.
            </p>

            <h2 className="text-2xl font-semibold text-[#fafafa] mt-8 mb-4 tracking-tight">
              Canon & Legends
            </h2>
            <p className="text-[#d4d4d8] mb-6 leading-relaxed">
              The Star Wars universe encompasses both official Canon (as defined by Lucasfilm) and Legends (the Expanded Universe). This archive embraces both, celebrating the full breadth of stories that have captivated fans for decades. Each article is clearly marked with its canon status.
            </p>

            <h2 className="text-2xl font-semibold text-[#fafafa] mt-8 mb-4 tracking-tight">
              Eras Covered
            </h2>
            <ul className="list-disc list-inside text-[#d4d4d8] mb-6 space-y-2">
              <li><strong className="text-amber-400">Old Republic</strong> — Ancient Jedi and Sith history</li>
              <li><strong className="text-amber-400">Prequel Era</strong> — The fall of the Republic</li>
              <li><strong className="text-amber-400">Clone Wars</strong> — The galaxy-spanning conflict</li>
              <li><strong className="text-amber-400">Imperial Era</strong> — The dark times under Palpatine's rule</li>
              <li><strong className="text-amber-400">Rebellion Era</strong> — The fight to restore freedom</li>
              <li><strong className="text-amber-400">Legends</strong> — Expanded Universe stories</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#fafafa] mt-8 mb-4 tracking-tight">
              Technology
            </h2>
            <p className="text-[#d4d4d8] mb-6 leading-relaxed">
              Built with Next.js 15, PostgreSQL, and deployed on Coolify. Images generated using OpenAI's DALL-E 3 with custom Star Wars style prompts. Content written by Claude AI with deep knowledge of Star Wars lore.
            </p>

            <div className="mt-12 pt-8 border-t border-[#2e2e35]">
              <p className="text-sm text-[#71717a] text-center">
                May the Force be with you, always.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
