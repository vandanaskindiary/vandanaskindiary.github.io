'use client'

import { useState } from 'react'
import { loginAction } from './actions'

const inputStyle = {
  background: 'rgba(250,247,244,0.06)',
  borderColor: 'rgba(250,247,244,0.15)',
}

export default function LoginForm({ next, errorMsg }: { next: string; errorMsg: string | null }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={loginAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />

      <label className="block">
        <span className="text-xs font-semibold tracking-wider uppercase block mb-2" style={{ color: '#c4a0b8' }}>
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@vandanaskindiary.com"
          className="w-full rounded-xl px-4 py-3 text-cream text-sm outline-none border focus:border-pink-300 transition-colors"
          style={inputStyle}
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold tracking-wider uppercase block mb-2" style={{ color: '#c4a0b8' }}>
          Password
        </span>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-xl px-4 py-3 pr-11 text-cream text-sm outline-none border focus:border-pink-300 transition-colors"
            style={inputStyle}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ color: '#c4a0b8' }}
            tabIndex={-1}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </label>

      {errorMsg && (
        <div
          className="rounded-xl px-4 py-3 text-sm border"
          style={{
            background: 'rgba(220,80,100,0.12)',
            borderColor: 'rgba(220,80,100,0.35)',
            color: '#ffc8d0',
          }}
        >
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        className="bg-plum text-white rounded-full py-3.5 text-sm font-semibold mt-1 hover:opacity-90 transition-opacity"
      >
        Sign in →
      </button>
    </form>
  )
}
