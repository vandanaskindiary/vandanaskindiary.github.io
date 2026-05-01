import Link from 'next/link'
import { POSTS } from '@/data/posts'
import { PRODUCTS } from '@/data/products'
import PostCard from '@/components/PostCard'
import ProductCard from '@/components/ProductCard'
import NewsletterForm from '@/components/NewsletterForm'

const CATEGORIES = [
  { cat: 'Skincare',   emoji: '🧴', color: '#f0e8f5', desc: 'Routines & ingredients' },
  { cat: 'Makeup',     emoji: '💄', color: '#f5e8ee', desc: 'Looks & tutorials' },
  { cat: 'Reviews',    emoji: '⭐', color: '#f5f0e0', desc: 'Honest product tests' },
  { cat: 'DIY',        emoji: '🌿', color: '#e8f5e8', desc: 'Home remedies' },
  { cat: 'Lifestyle',  emoji: '☀️', color: '#f5ece0', desc: 'Self-care & wellness' },
  { cat: 'Wellness',   emoji: '🫶', color: '#e8eef5', desc: 'Inside-out beauty' },
]

const MARQUEE_ITEMS = [
  '✦ Honest Reviews', 'Budget-Friendly Picks', 'Dermatologist Insights',
  'Indian Skin Tones', 'Zero-BS Recommendations', 'Affiliate Disclosed Always',
  'Science-Backed Routines', 'Tested on Real Skin',
]

export default function HomePage() {
  const featured = POSTS.filter((p) => p.featured).slice(0, 4)
  const editorPicks = PRODUCTS.filter((p) =>
    ['Best Seller', "Editor's Pick", 'Top Rated', 'Fan Favourite'].includes(p.tag)
  ).slice(0, 4)

  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden px-6 pt-24 pb-20"
        style={{ background: 'linear-gradient(135deg, #1e1014 0%, #4a2d4a 50%, #3d1f3c 100%)' }}
      >
        {/* BG blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{ background: '#784f77', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-15"
          style={{ background: '#c27b52', transform: 'translate(-30%, 30%)' }} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border text-xs font-semibold tracking-wider"
              style={{ background: 'rgba(120,79,119,0.22)', borderColor: 'rgba(120,79,119,0.4)', color: '#f0e8f0' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              NEW POSTS EVERY WEEK
            </div>

            <h1 className="font-serif font-bold text-cream mb-6 leading-none tracking-tight"
              style={{ fontSize: 'clamp(42px, 6vw, 76px)' }}>
              Breakup with bad skincare.
              <br />
              <span className="italic" style={{ color: '#ffa3dd' }}>For real.</span>
            </h1>

            <p className="text-lg leading-relaxed mb-9 max-w-lg" style={{ color: '#c4b0c0' }}>
              Honest skincare reviews, budget beauty, and wellness routines that actually fit into Indian life. No filters. No paid opinions.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link href="/blog"
                className="bg-plum text-white px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-opacity">
                Read the Blog →
              </Link>
              <Link href="/products"
                className="px-8 py-4 rounded-full text-base font-medium transition-opacity hover:opacity-80"
                style={{ border: '1.5px solid rgba(250,247,244,0.3)', color: '#faf7f4' }}>
                🛍 Shop Picks
              </Link>
            </div>

            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[['150+', 'Products tested'], ['50K+', 'Monthly readers'], ['6', 'Categories covered']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-3xl font-bold text-cream">{n}</div>
                  <div className="text-xs mt-1" style={{ color: '#9a8090' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden md:block">
            {/* Hero image placeholder */}
            <div className="rounded-3xl overflow-hidden border border-white/10" style={{ background: '#4a2d4a', aspectRatio: '3/4' }}>
              <div className="w-full h-full flex items-center justify-center font-mono text-xs opacity-40 text-center p-8"
                style={{ color: '#d8c8d8' }}>
                hero — skincare flatlay<br />or Vandana portrait
              </div>
            </div>
            {/* Floating cards */}
            <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl p-4 shadow-2xl border border-border">
              <div className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: '#7a5a6a' }}>Latest Pick</div>
              <div className="font-serif font-bold text-ink text-sm mb-1">Minimalist Niacinamide</div>
              <div className="text-xs font-semibold" style={{ color: '#784f77' }}>₹349 · Amazon →</div>
            </div>
            <div className="absolute -top-2 -right-6 rounded-2xl p-3 shadow-xl"
              style={{ background: '#4a2d4a' }}>
              <div className="text-xs mb-1" style={{ color: '#d0b8d0' }}>Trending now</div>
              <div className="text-sm font-semibold text-cream">✨ SPF Guide 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-3" style={{ background: '#4a2d4a' }}>
        <div className="marquee-inner whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-block px-8 text-xs font-medium tracking-widest"
              style={{ color: '#d8c8d8' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-0">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-plum">Explore by Topic</span>
          <h2 className="font-serif text-4xl font-bold text-ink mt-2">What are you looking for?</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((item) => (
            <Link key={item.cat} href={`/blog?category=${item.cat}`}
              className="rounded-3xl p-6 text-center border border-border hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              style={{ background: item.color }}>
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="font-serif text-base font-bold text-ink mb-1">{item.cat}</div>
              <div className="text-xs text-muted">{item.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED POSTS ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-plum">Latest & Greatest</span>
            <h2 className="font-serif text-4xl font-bold text-ink mt-2">From the Diary</h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-plum hover:underline">All posts →</Link>
        </div>

        <PostCard post={featured[0]} wide />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {featured.slice(1, 4).map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>

      {/* ── EDITOR PICKS ── */}
      <section className="py-16 px-6" style={{ background: '#f3ece6', borderTop: '1px solid #e8d8e0', borderBottom: '1px solid #e8d8e0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-plum">Affiliate Picks</span>
              <h2 className="font-serif text-4xl font-bold text-ink mt-2">Editor&apos;s Favourites</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-plum border border-plum rounded-full px-5 py-2 hover:bg-plum hover:text-white transition-colors">
              Shop all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {editorPicks.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="relative overflow-hidden py-20 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #4a2d4a, #3d1f3c)' }}>
        <div className="absolute inset-x-0 top-0 h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(120,79,119,0.3) 0%, transparent 70%)' }} />
        <div className="max-w-xl mx-auto relative z-10">
          <div className="text-4xl mb-4">💌</div>
          <span className="text-xs font-bold tracking-widest uppercase text-plum">Join the Glow Club</span>
          <h2 className="font-serif text-4xl font-bold text-cream mt-3 mb-4 leading-snug">
            Skincare tips & honest reviews,<br />straight to your inbox.
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#b09ab0' }}>
            No spam. No paid reviews. Just the good stuff, twice a month.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
