import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Vandana Skin Diary',
}

const SECTIONS = [
  { title: 'Introduction', body: 'This Privacy Policy explains how Vandana Skin Diary collects, uses, and protects your personal information when you visit this website. By using this site, you agree to the practices described below.' },
  { title: 'Affiliate Disclosure', body: 'Vandana Skin Diary participates in affiliate programs including Amazon Associates, Flipkart Affiliate, Nykaa Affiliate, and Myntra Affiliate. We earn a commission when you purchase through our links, at no additional cost to you. All affiliate links are clearly disclosed in every post.' },
  { title: 'Information We Collect', body: 'We may collect your name and email address when you subscribe to our newsletter. We use analytics tools (Google Analytics) to understand site traffic. We do not sell your personal information to third parties.' },
  { title: 'Cookies', body: 'We use cookies for analytics (Google Analytics) and affiliate tracking. You may disable cookies in your browser settings, though this may affect some site functionality.' },
  { title: 'Email Newsletter', body: 'Newsletter subscribers can unsubscribe at any time via the link in any email. Your email is used only to send skincare content and updates — never shared or sold.' },
  { title: 'Third-Party Links', body: 'This site links to Amazon, Flipkart, Nykaa, Myntra, and other platforms. Please review their respective privacy policies — we are not responsible for their practices.' },
  { title: 'Your Rights', body: 'You may request access to, correction of, or deletion of your personal data at any time. Contact: privacy@vandanaskincare.com' },
  { title: 'Changes to This Policy', body: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of this website constitutes acceptance of the updated policy.' },
]

export default function PrivacyPage() {
  return (
    <div>
      <div className="px-6 pt-16 pb-12 text-center"
        style={{ background: 'linear-gradient(160deg, #4a2d4a, #3d1f3c)' }}>
        <h1 className="font-serif text-5xl font-bold text-cream mb-2">Privacy Policy</h1>
        <p className="text-sm" style={{ color: '#b09ab0' }}>Last updated: May 1, 2026</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {SECTIONS.map((s) => (
          <div key={s.title} className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-ink mb-3 pb-3"
              style={{ borderBottom: '2px solid rgba(120,79,119,0.15)' }}>
              {s.title}
            </h2>
            <p className="text-base leading-loose" style={{ color: '#4a2a3a' }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
