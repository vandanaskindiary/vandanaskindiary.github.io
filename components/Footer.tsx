'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const categories = ['Skincare', 'Makeup', 'Reviews', 'DIY', 'Lifestyle', 'Wellness']
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Shop', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ]
  const shopBy = ['Skincare', 'Makeup', 'Wellness', 'Budget Under ₹500', 'Best Sellers', 'Dermatologist Picks']

  return (
    <footer className="bg-ink relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: '#784f77', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: '#c27b52', transform: 'translate(-30%, 30%)' }} />

      {/* Newsletter strip */}
      <div className="border-b border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="font-serif text-3xl font-bold text-cream">Join the Glow Club ✨</h3>
            <p className="text-sm mt-1" style={{ color: '#786070' }}>
              Skincare tips, honest reviews, exclusive deals. Zero spam.
            </p>
          </div>
          {done ? (
            <p className="font-serif text-xl italic" style={{ color: '#d8c8d8' }}>
              You&apos;re in! Welcome 🌸
            </p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setDone(true) }}
              className="flex gap-3 flex-shrink-0"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="px-5 py-3 rounded-full border border-white/15 text-cream text-sm outline-none w-60"
                style={{ background: 'rgba(255,255,255,0.08)', fontFamily: 'inherit' }}
              />
              <button
                type="submit"
                className="bg-plum text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-serif text-2xl font-bold text-cream">Vandana</span>
            <span className="font-serif text-2xl font-normal italic text-plum">Skin Diary</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#786070' }}>
            Honest skincare, beauty & wellness for real Indian women. No paid opinions. No filters.
          </p>
          <div className="flex gap-2 mt-5">
            {[
              { label: 'Pinterest', bg: '#E60023' },
              { label: 'Instagram', bg: '#784f77' },
              { label: 'YouTube', bg: '#FF0000' },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                className="text-white text-xs font-bold px-3 py-2 rounded-2xl"
                style={{ background: s.bg }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#5a3a4a' }}>
            Categories
          </p>
          <div className="flex flex-col gap-3">
            {categories.map((c) => (
              <Link
                key={c}
                href={`/blog?category=${c}`}
                className="text-sm transition-colors duration-150"
                style={{ color: '#9a8090' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#faf7f4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9a8090')}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#5a3a4a' }}>
            Quick Links
          </p>
          <div className="flex flex-col gap-3">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-colors duration-150"
                style={{ color: '#9a8090' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#faf7f4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9a8090')}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Shop by */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#5a3a4a' }}>
            Shop By
          </p>
          <div className="flex flex-col gap-3">
            {shopBy.map((c) => (
              <Link
                key={c}
                href="/products"
                className="text-sm transition-colors duration-150"
                style={{ color: '#9a8090' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#faf7f4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9a8090')}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 flex-wrap">
          <p className="text-xs" style={{ color: '#5a3a4a' }}>
            © 2026 Vandana Skin Diary. All rights reserved.
          </p>
          <div className="flex gap-5">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Affiliate Disclosure', href: '/privacy' },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="text-xs" style={{ color: '#5a3a4a' }}>
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-xs" style={{ color: '#3a2030' }}>
            Made with 💜 in India
          </p>
        </div>
      </div>
    </footer>
  )
}
