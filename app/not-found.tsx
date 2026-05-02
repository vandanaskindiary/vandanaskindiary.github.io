import Link from 'next/link'

export default function NotFound() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center px-6 py-24"
      style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(135deg, #1e1014 0%, #4a2d4a 55%, #3d1f3c 100%)',
      }}
    >
      <div
        className="absolute top-0 right-0 w-[28rem] h-[28rem] rounded-full pointer-events-none opacity-20"
        style={{ background: '#784f77', transform: 'translate(35%, -35%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-15"
        style={{ background: '#c27b52', transform: 'translate(-30%, 30%)' }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border text-xs font-semibold tracking-widest uppercase"
          style={{
            background: 'rgba(120,79,119,0.22)',
            borderColor: 'rgba(120,79,119,0.4)',
            color: '#f0e8f0',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 inline-block" />
          Page not found
        </div>

        <h1
          className="font-serif font-bold leading-none tracking-tight mb-6"
          style={{
            fontSize: 'clamp(96px, 16vw, 200px)',
            color: '#faf7f4',
            letterSpacing: '-0.04em',
          }}
        >
          4<span className="italic" style={{ color: '#ffa3dd' }}>0</span>4
        </h1>

        <h2
          className="font-serif font-bold mb-5 leading-tight"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#faf7f4' }}
        >
          This page ghosted us.
          <br />
          <span className="italic" style={{ color: '#ffa3dd' }}>Like a bad serum.</span>
        </h2>

        <p
          className="text-base leading-relaxed mb-10 max-w-md mx-auto"
          style={{ color: '#c4b0c0' }}
        >
          The link you followed is broken, retired, or never existed. Let&apos;s get you
          back to something that actually glows.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/"
            className="bg-plum text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            ← Back home
          </Link>
          <Link
            href="/blog"
            className="px-7 py-3.5 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
            style={{ border: '1.5px solid rgba(250,247,244,0.3)', color: '#faf7f4' }}
          >
            Read the Blog
          </Link>
          <Link
            href="/products"
            className="px-7 py-3.5 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
            style={{ border: '1.5px solid rgba(250,247,244,0.3)', color: '#faf7f4' }}
          >
            🛍 Shop Picks
          </Link>
        </div>
      </div>
    </section>
  )
}
