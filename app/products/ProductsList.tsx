'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Product } from '@/lib/db/schema'
import ProductCard from '@/components/ProductCard'

const CATS = ['All', 'Skincare', 'Makeup', 'Wellness', 'Lifestyle', 'DIY']
type SortKey = 'popular' | 'rating' | 'price-low' | 'price-high'

function priceNum(p: string): number {
  return parseInt(p.replace(/[^\d]/g, '')) || 0
}

export default function ProductsList({ products }: { products: Product[] }) {
  const searchParams = useSearchParams()
  const defaultCat = searchParams.get('category') || 'All'
  const [activeCat, setActiveCat] = useState(defaultCat)
  const [sortBy, setSortBy] = useState<SortKey>('popular')

  let filtered = products.filter((p) => activeCat === 'All' || p.category === activeCat)
  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => priceNum(a.price) - priceNum(b.price))
  if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => priceNum(b.price) - priceNum(a.price))
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => Number(b.rating) - Number(a.rating))

  return (
    <div>
      <div className="px-6 pt-16 pb-12"
        style={{ background: 'linear-gradient(160deg, #1e1014 0%, #4a2d4a 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-plum">Affiliate Shop</span>
          <h1 className="font-serif text-5xl font-bold text-cream mt-2 mb-3">
            My Favourite <span className="italic text-plum">Picks</span>
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: '#b09ab0' }}>
            Every product here has been personally tested or carefully researched.
            Clicking a link may earn me a small commission — at no extra cost to you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-center py-6 flex-wrap gap-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {CATS.map((c) => (
              <button key={c} onClick={() => setActiveCat(c)}
                className="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all"
                style={{
                  background: activeCat === c ? '#784f77' : 'transparent',
                  color: activeCat === c ? '#fff' : '#7a5a6a',
                  borderColor: activeCat === c ? '#784f77' : '#e8d8e0',
                }}>
                {c}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="px-4 py-2 rounded-full border text-sm outline-none cursor-pointer"
            style={{ borderColor: '#e8d8e0', background: '#fff', color: '#1e1014', fontFamily: 'inherit' }}>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="rounded-2xl p-4 mb-7 text-sm leading-relaxed border"
          style={{ background: '#784f7712', borderColor: '#784f7730', color: '#7a5a6a' }}>
          <strong className="text-ink">Affiliate Disclosure: </strong>
          Links on this page are affiliate links. I earn a small commission if you purchase —
          this helps keep the blog running.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  )
}
