'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/blog',     label: 'Blog' },
  { href: '/products', label: '🛍 Shop' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  if (pathname?.startsWith('/admin')) return null

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-plum-dark text-sm text-center py-2 px-4 font-medium" style={{ color: '#f0e8f0' }}>
        ✨ New review:{' '}
        <em>Best Sunscreens of 2026 — India Edition</em>
        &nbsp;·&nbsp;
        <Link href="/blog/sunscreen-review-india-2026" className="underline font-semibold" style={{ color: '#e8c8e8' }}>
          Read now →
        </Link>
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-cream border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-ink tracking-tight">Vandana</span>
            <span className="font-serif text-2xl font-normal italic text-plum tracking-tight">Skin Diary</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  pathname === l.href
                    ? 'bg-plum/10 text-plum font-semibold'
                    : 'text-muted hover:text-ink hover:bg-cream-dark'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-cream px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-base border-b border-border ${
                  pathname === l.href ? 'font-semibold text-plum' : 'text-ink'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
