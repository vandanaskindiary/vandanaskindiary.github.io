'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return done ? (
    <p className="font-serif text-2xl italic" style={{ color: '#f0e8f0' }}>
      Welcome to the diary! 🌸
    </p>
  ) : (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) setDone(true) }}
      className="flex gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-6 py-4 rounded-full text-cream text-sm outline-none border border-white/15"
        style={{ background: 'rgba(255,255,255,0.1)', fontFamily: 'inherit' }}
      />
      <button
        type="submit"
        className="bg-plum text-white px-6 py-4 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  )
}
