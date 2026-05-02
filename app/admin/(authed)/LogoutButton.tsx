'use client'

export default function LogoutButton() {
  async function onClick() {
    await fetch('/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }
  return (
    <button
      onClick={onClick}
      className="text-xs px-3 py-2 rounded-full bg-plum text-white font-semibold hover:opacity-90 transition-opacity"
    >
      Sign out
    </button>
  )
}
