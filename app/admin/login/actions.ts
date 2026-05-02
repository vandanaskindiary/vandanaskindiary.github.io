'use server'

import { redirect } from 'next/navigation'
import { login } from '@/lib/auth'

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/admin')

  if (!email || !password) {
    redirect(`/admin/login?error=missing&next=${encodeURIComponent(next)}`)
  }

  const session = await login(email, password)
  if (!session) {
    redirect(`/admin/login?error=invalid&next=${encodeURIComponent(next)}`)
  }
  redirect(next.startsWith('/admin') ? next : '/admin')
}
