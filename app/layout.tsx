import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Vandana Skin Diary — Breakup with bad skincare',
  description:
    'Honest skincare reviews, budget beauty picks, and wellness routines for real Indian women. No paid opinions, no filters.',
  keywords: 'skincare india, oily skin moisturizer, niacinamide serum india, best sunscreen india, budget skincare',
  openGraph: {
    title: 'Vandana Skin Diary',
    description: 'Honest skincare for real Indian women.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
