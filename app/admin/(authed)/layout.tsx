import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import LogoutButton from './LogoutButton'
import AdminSidebarNav from './AdminSidebarNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen flex bg-cream">
      <aside
        className="w-64 shrink-0 border-r border-border flex flex-col sticky top-0 h-screen"
        style={{ background: '#1e1014' }}
      >
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/admin" className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-cream tracking-tight">Vandana</span>
            <span className="font-serif text-xl italic tracking-tight" style={{ color: '#ffa3dd' }}>SD</span>
          </Link>
          <p className="text-[10px] font-bold tracking-widest uppercase mt-1" style={{ color: '#7a5a6a' }}>
            Admin Console
          </p>
        </div>

        <AdminSidebarNav />

        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: '#5a3a4a' }}>
            Signed in as
          </p>
          <p className="text-xs mb-3 truncate" style={{ color: '#c4b0c0' }}>{session.email}</p>
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="text-xs text-center px-3 py-2 rounded-full border transition-opacity hover:opacity-80"
              style={{ borderColor: 'rgba(250,247,244,0.18)', color: '#c4b0c0' }}
            >
              ↗ View site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
    </div>
  )
}
