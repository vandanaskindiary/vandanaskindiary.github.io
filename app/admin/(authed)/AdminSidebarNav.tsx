'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '✦', exact: true },
  { href: '/admin/posts', label: 'Posts', icon: '✎', exact: false },
  { href: '/admin/products', label: 'Products', icon: '🛍', exact: false },
]

export default function AdminSidebarNav() {
  const pathname = usePathname()
  return (
    <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{
              background: active ? 'rgba(120,79,119,0.18)' : 'transparent',
              color: active ? '#ffa3dd' : '#d8c8d8',
            }}
          >
            <span className="w-5 text-center" style={{ color: '#ffa3dd' }}>{item.icon}</span>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
