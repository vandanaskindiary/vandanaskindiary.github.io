import { Suspense } from 'react'
import { listProducts } from '@/lib/db/queries'
import ProductsList from './ProductsList'

export const revalidate = 60

export const metadata = {
  title: 'Shop My Picks — Vandana Skin Diary',
  description: 'Hand-picked, personally tested skincare and beauty products from India.',
}

export default async function ProductsPage() {
  const products = await listProducts()
  return (
    <Suspense fallback={<div className="text-center py-20 text-muted">Loading…</div>}>
      <ProductsList products={products} />
    </Suspense>
  )
}
