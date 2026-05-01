import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Vandana Skin Diary',
  description: 'Meet Vandana — the honest skincare blogger behind Vandana Skin Diary.',
}

const VALUES = [
  { icon: '🧴', title: 'Honest Reviews', desc: 'Every product I feature has been personally tested. Sponsored posts are always labeled — and rare.' },
  { icon: '💰', title: 'Budget-First', desc: '95% of my picks are under ₹800. Great skin should not require a luxury budget.' },
  { icon: '🔬', title: 'Science-Backed', desc: 'I read ingredient lists so you don\'t have to. No pseudoscience, no "detox" myths.' },
  { icon: '🌿', title: 'Inclusive Beauty', desc: 'Recommendations for Indian skin tones, textures, and the actual climate we live in.' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="px-6 pt-20 pb-16"
        style={{ background: 'linear-gradient(160deg, #4a2d4a 0%, #3d1f3c 100%)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-plum">Hey there 👋</span>
            <h1 className="font-serif text-5xl font-bold text-cream mt-3 mb-5 leading-tight">
              I&apos;m Vandana.<br />
              <span className="italic text-plum">Nice to meet you.</span>
            </h1>
            <p className="text-base leading-loose mb-4" style={{ color: '#c4b0c0' }}>
              I spent years wasting money on products that promised everything and delivered nothing.
              I had oily, acne-prone skin, a limited budget, and absolutely zero idea what I was doing.
            </p>
            <p className="text-base leading-loose mb-4" style={{ color: '#c4b0c0' }}>
              So I started reading. Then testing. Then writing. Three years later, I&apos;ve tried 150+
              products and built a community of skin-curious people who are tired of being sold to.
            </p>
            <p className="text-base leading-loose" style={{ color: '#c4b0c0' }}>
              This diary is everything I wish someone had told me earlier — honest, budget-friendly,
              and always science-backed.
            </p>
            <div className="flex gap-8 mt-10 pt-8 border-t border-white/10">
              {[['150+', 'Products tested'], ['50K+', 'Monthly readers'], ['3 yrs', 'Skin journaling']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-3xl font-bold text-cream">{n}</div>
                  <div className="text-xs mt-1" style={{ color: '#9a8090' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait placeholder */}
          <div className="rounded-3xl overflow-hidden border border-white/10 hidden md:block"
            style={{ background: 'rgba(74,45,74,0.6)', aspectRatio: '3/4' }}>
            <div className="w-full h-full flex items-center justify-center font-mono text-xs opacity-40 text-center p-8"
              style={{ color: '#d8c8d8' }}>
              Vandana portrait<br />lifestyle / skincare setup
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-serif text-4xl font-bold text-ink text-center mb-10">
          What I stand for
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((item) => (
            <div key={item.title} className="bg-white rounded-3xl p-6 border border-border"
              style={{ boxShadow: '0 2px 12px rgba(120,79,119,0.06)' }}>
              <div className="text-3xl mb-4">{item.icon}</div>
              <div className="font-serif text-xl font-bold text-ink mb-2">{item.title}</div>
              <div className="text-sm text-muted leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
