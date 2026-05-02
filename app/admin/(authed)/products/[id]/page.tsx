import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/db/queries'
import { updateProduct } from '../actions'
import ProductForm from '../ProductForm'
import DeleteProductButton from '../DeleteProductButton'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(Number(id))
  if (!product) notFound()

  const updateAction = updateProduct.bind(null, product.id)

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-10 py-3 border-b border-border bg-cream-dark">
        <Link href="/admin/products" className="text-xs font-semibold text-muted hover:text-ink">
          ← All products
        </Link>
        <div className="flex items-center gap-3">
          {product.link && (
            <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-plum hover:underline">
              Buy link ↗
            </a>
          )}
          <DeleteProductButton id={product.id} />
        </div>
      </div>
      <ProductForm action={updateAction} product={product} />
    </div>
  )
}
