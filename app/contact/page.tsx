'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSent(true)
  }

  const field = (key: keyof typeof form) =>
    `w-full px-5 py-3 rounded-2xl border text-sm outline-none transition-colors ${
      errors[key] ? 'border-red-400' : 'border-border focus:border-plum'
    }`

  return (
    <div>
      <div className="px-6 pt-16 pb-12 text-center"
        style={{ background: 'linear-gradient(160deg, #4a2d4a, #3d1f3c)' }}>
        <h1 className="font-serif text-5xl font-bold text-cream mb-2">
          Get in <span className="italic text-plum">Touch</span>
        </h1>
        <p className="text-base" style={{ color: '#b09ab0' }}>
          Collaborations, PR, affiliate deals, or just want to say hi.
        </p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-16">
        {sent ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">💌</div>
            <h2 className="font-serif text-3xl font-bold text-ink mb-3">Message sent!</h2>
            <p className="text-muted">I&apos;ll get back to you within 2–3 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {[
              { k: 'name' as const, l: 'Your Name', t: 'text', ph: 'e.g. Priya Sharma' },
              { k: 'email' as const, l: 'Email', t: 'email', ph: 'priya@example.com' },
            ].map((f) => (
              <div key={f.k}>
                <label className="text-sm font-semibold text-ink block mb-2">{f.l}</label>
                <input type={f.t} value={form[f.k]}
                  onChange={(e) => setForm((s) => ({ ...s, [f.k]: e.target.value }))}
                  placeholder={f.ph} className={field(f.k)}
                  style={{ background: '#fff8f3', fontFamily: 'inherit' }} />
                {errors[f.k] && <p className="text-xs text-red-500 mt-1">{errors[f.k]}</p>}
              </div>
            ))}

            <div>
              <label className="text-sm font-semibold text-ink block mb-2">Subject</label>
              <select value={form.subject}
                onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
                className="w-full px-5 py-3 rounded-2xl border border-border text-sm outline-none"
                style={{ background: '#fff8f3', fontFamily: 'inherit' }}>
                {['General', 'Collaboration / PR', 'Affiliate Partnership', 'Guest Post', 'Other'].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-ink block mb-2">Message</label>
              <textarea value={form.message} rows={6} placeholder="What's on your mind?"
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                className={field('message')}
                style={{ background: '#fff8f3', fontFamily: 'inherit', resize: 'vertical' }} />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            <button type="submit"
              className="w-full bg-plum text-white py-4 rounded-full text-base font-semibold hover:opacity-90 active:scale-95 transition-all">
              Send Message →
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
