'use client'

import { useState } from 'react'
import type { Product } from '@/lib/db/schema'

interface ProductCardProps {
  product: Product
  compact?: boolean
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="text-xs" style={{ color: i < Math.floor(rating) ? '#e8a83c' : '#e0d0c8' }}>★</span>
      ))}
      <span className="text-xs ml-1.5 text-muted">{rating}</span>
    </span>
  )
}

function DiscountBadge({ price, mrp }: { price: string; mrp: string }) {
  const p = parseInt(price.replace(/[^\d]/g, ''))
  const m = parseInt(mrp.replace(/[^\d]/g, ''))
  if (!p || !m) return null
  const pct = Math.round(((m - p) / m) * 100)
  return pct > 0 ? (
    <span className="text-xs font-bold text-white px-2 py-0.5 rounded" style={{ background: '#e85c5c' }}>
      {pct}% OFF
    </span>
  ) : null
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const [feedback, setFeedback] = useState('')
  const rating = Number(product.rating) || 0

  const handleBuy = () => {
    if (!product.link || product.link === 'YOUR_AFFILIATE_LINK_HERE') {
      setFeedback('Link coming soon!')
      setTimeout(() => setFeedback(''), 2000)
      return
    }
    window.open(product.link, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden border border-border flex flex-col transition-all duration-250 hover:-translate-y-1.5"
      style={{ boxShadow: '0 2px 12px rgba(120,79,119,0.07)' }}
    >
      <div className="relative" style={{ background: product.color, aspectRatio: '4/3' }}>
        {product.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.coverImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <>
            <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
              <defs>
                <pattern id={`stripe-p-${product.id}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="12" x2="12" y2="0" stroke="#5a3060" strokeWidth="1.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#stripe-p-${product.id})`} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-xs opacity-50 text-center p-3"
              style={{ color: '#5a3060' }}>
              {product.brand} — product photo
            </span>
          </>
        )}
        {product.tagline && (
          <span className="absolute top-3 left-3 bg-plum text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
            {product.tagline}
          </span>
        )}
      </div>

      <div className={`flex flex-col gap-1.5 flex-1 ${compact ? 'p-4' : 'p-5'}`}>
        <span className="text-xs text-muted font-medium">{product.brand}</span>
        <h4 className={`font-serif font-bold text-ink leading-snug ${compact ? 'text-base' : 'text-lg'}`}>
          {product.name}
        </h4>
        {!compact && <p className="text-sm text-muted leading-relaxed">{product.description}</p>}
        <div className="flex items-center gap-2">
          <Stars rating={rating} />
          <span className="text-xs text-muted">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-serif text-xl font-bold text-ink">{product.price}</span>
          {product.mrp && <span className="text-sm text-muted line-through">{product.mrp}</span>}
          <DiscountBadge price={product.price} mrp={product.mrp} />
        </div>
        <button
          onClick={handleBuy}
          className="mt-auto w-full bg-plum text-white rounded-full py-2.5 text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150"
        >
          {feedback || `Check Price on ${product.whereToBuy} →`}
        </button>
      </div>
    </div>
  )
}
