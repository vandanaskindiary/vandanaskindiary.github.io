import Link from 'next/link'
import { listProducts } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const allProducts = await listProducts()

  return (
    <div className="px-10 py-10 max-w-5xl">
      <header className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-plum">Admin</p>
          <h1 className="font-serif text-5xl font-bold text-ink mt-1 leading-none">Products</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-plum text-white px-5 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New product
        </Link>
      </header>

      <div className="rounded-3xl border border-border bg-white overflow-hidden">
        {allProducts.length === 0 ? (
          <div className="px-8 py-20 text-center">
            <p className="font-serif text-2xl text-ink mb-2">No products yet.</p>
            <Link href="/admin/products/new" className="inline-block mt-4 bg-plum text-white px-5 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              + Add your first product
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-bold tracking-widest uppercase text-muted">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-muted hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-muted hidden lg:table-cell">Price</th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-muted hidden lg:table-cell">Rating</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allProducts.map((p) => (
                <tr key={p.id} className="hover:bg-cream transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl shrink-0"
                        style={{ background: p.color }}
                      />
                      <div>
                        <Link href={`/admin/products/${p.id}`} className="font-serif font-bold text-ink hover:text-plum transition-colors line-clamp-1">
                          {p.name}
                        </Link>
                        <p className="text-xs text-muted">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted hidden md:table-cell">{p.category}</td>
                  <td className="px-4 py-4 text-ink font-medium hidden lg:table-cell">{p.price}</td>
                  <td className="px-4 py-4 text-muted hidden lg:table-cell">
                    {Number(p.rating) > 0 ? `★ ${p.rating}` : '—'}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link href={`/admin/products/${p.id}`} className="text-xs font-semibold text-plum hover:underline">
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
