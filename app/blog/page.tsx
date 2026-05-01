'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { POSTS } from '@/data/posts'
import PostCard from '@/components/PostCard'

const CATEGORIES = ['All', 'Skincare', 'Makeup', 'Reviews', 'DIY', 'Lifestyle', 'Wellness']

function BlogContent() {
  const searchParams = useSearchParams()
  const defaultCat = searchParams.get('category') || 'All'
  const [activeCat, setActiveCat] = useState(defaultCat)
  const [query, setQuery] = useState('')

  const filtered = POSTS.filter((p) => {
    const catOk = activeCat === 'All' || p.category === activeCat
    const q = query.toLowerCase()
    const qOk = !q || p.title.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
    return catOk && qOk
  })

  return (
    <div>
      {/* Header */}
      <div className="px-6 pt-16 pb-12 text-center"
        style={{ background: 'linear-gradient(160deg, #4a2d4a 0%, #3d1f3c 100%)' }}>
        <h1 className="font-serif text-5xl font-bold text-cream mb-3">
          The <span className="italic text-plum">Diary</span>
        </h1>
        <p className="text-base mb-8" style={{ color: '#b09ab0' }}>
          Honest skincare, beauty & wellness — no paid opinions, ever.
        </p>
        <div className="flex max-w-lg mx-auto gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, ingredients, products…"
            className="flex-1 px-5 py-3 rounded-full text-sm outline-none border border-white/15"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#faf7f4', fontFamily: 'inherit' }}
          />
          <button className="bg-plum text-white px-5 py-3 rounded-full flex-shrink-0">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto py-6 scrollbar-none">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-150"
              style={{
                background: activeCat === c ? '#784f77' : 'transparent',
                color: activeCat === c ? '#fff' : '#7a5a6a',
                borderColor: activeCat === c ? '#784f77' : '#e8d8e0',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-serif text-2xl text-ink">No posts found for &quot;{query}&quot;</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-muted">Loading…</div>}>
      <BlogContent />
    </Suspense>
  )
}
