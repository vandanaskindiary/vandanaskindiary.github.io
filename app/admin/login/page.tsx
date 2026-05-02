import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import LoginForm from './LoginForm'

type SearchParams = Promise<{ next?: string; error?: string }>

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await getSession()
  const params = await searchParams
  const next = params.next ?? '/admin'
  if (session) redirect(next.startsWith('/admin') ? next : '/admin')

  const errorMsg =
    params.error === 'invalid'
      ? 'Invalid email or password.'
      : params.error === 'missing'
      ? 'Email and password are required.'
      : null

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center px-6 py-16"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e1014 0%, #4a2d4a 55%, #3d1f3c 100%)',
      }}
    >
      <div
        className="absolute top-0 right-0 w-[28rem] h-[28rem] rounded-full pointer-events-none opacity-20"
        style={{ background: '#784f77', transform: 'translate(35%, -35%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-15"
        style={{ background: '#c27b52', transform: 'translate(-30%, 30%)' }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-baseline gap-2 mb-4">
            <span className="font-serif text-3xl font-bold text-cream tracking-tight">Vandana</span>
            <span className="font-serif text-3xl italic tracking-tight" style={{ color: '#ffa3dd' }}>
              Skin Diary
            </span>
          </div>
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#c4a0b8' }}>
            Admin Console
          </p>
        </div>

        <div
          className="rounded-3xl p-8 backdrop-blur-md border"
          style={{
            background: 'rgba(250,247,244,0.04)',
            borderColor: 'rgba(250,247,244,0.12)',
          }}
        >
          <h1 className="font-serif text-3xl font-bold text-cream mb-2">Welcome back.</h1>
          <p className="text-sm mb-6" style={{ color: '#c4b0c0' }}>
            Sign in to manage posts and products.
          </p>
          <LoginForm next={next} errorMsg={errorMsg} />
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#7a5a6a' }}>
          Lost access? Run{' '}
          <code
            className="rounded px-1.5 py-0.5"
            style={{ background: 'rgba(250,247,244,0.08)', color: '#c4a0b8' }}
          >
            pnpm admin:set-password
          </code>
        </p>
      </div>
    </section>
  )
}
