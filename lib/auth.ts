import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'
import { db } from './db/client'
import { users } from './db/schema'

const COOKIE_NAME = 'vsd_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7

function getSecret(): Uint8Array {
  const s = process.env.AUTH_SECRET
  if (!s) throw new Error('AUTH_SECRET is not set')
  return new TextEncoder().encode(s)
}

export type Session = { userId: number; email: string }

export async function signSession(payload: Session): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifySession(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return { userId: payload.userId as number, email: payload.email as string }
  } catch {
    return null
  }
}

export async function getSession(): Promise<Session | null> {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySession(token)
}

export async function login(email: string, password: string): Promise<Session | null> {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (!user) return null
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return null
  const session: Session = { userId: user.id, email: user.email }
  const token = await signSession(session)
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  })
  return session
}

export function logout(): void {
  cookies().delete(COOKIE_NAME)
}

export const SESSION_COOKIE = COOKIE_NAME
