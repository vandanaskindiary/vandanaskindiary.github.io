'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { products } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getSession } from '@/lib/auth'

async function requireAuth() {
  const session = await getSession()
  if (!session) redirect('/admin/login')
}

function parseFormData(formData: FormData) {
  const tags = String(formData.get('tags') ?? '')
    .split(',').map((t) => t.trim()).filter(Boolean)
  return {
    name: String(formData.get('name') ?? '').trim(),
    brand: String(formData.get('brand') ?? '').trim(),
    price: String(formData.get('price') ?? '').trim(),
    mrp: String(formData.get('mrp') ?? '').trim(),
    rating: String(formData.get('rating') ?? '0'),
    reviews: Number(formData.get('reviews') ?? 0),
    category: String(formData.get('category') ?? 'Skincare'),
    tagline: String(formData.get('tagline') ?? '').trim(),
    color: String(formData.get('color') ?? '#e8d5e8'),
    description: String(formData.get('description') ?? '').trim(),
    link: String(formData.get('link') ?? '').trim(),
    whereToBuy: String(formData.get('whereToBuy') ?? 'Amazon').trim(),
    coverImage: String(formData.get('coverImage') ?? '').trim() || null,
    tags,
  }
}

export async function createProduct(formData: FormData) {
  await requireAuth()
  const data = parseFormData(formData)
  const [created] = await db.insert(products).values({ ...data, updatedAt: new Date() }).returning({ id: products.id })
  revalidatePath('/products')
  revalidatePath('/')
  redirect(`/admin/products/${created.id}`)
}

export async function updateProduct(id: number, formData: FormData) {
  await requireAuth()
  const data = parseFormData(formData)
  await db.update(products).set({ ...data, updatedAt: new Date() }).where(eq(products.id, id))
  revalidatePath('/products')
  revalidatePath('/')
  redirect(`/admin/products/${id}`)
}

export async function deleteProduct(id: number) {
  await requireAuth()
  await db.delete(products).where(eq(products.id, id))
  revalidatePath('/products')
  revalidatePath('/')
  redirect('/admin/products')
}
