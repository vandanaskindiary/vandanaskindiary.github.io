'use client'

import type { Product } from '@/lib/db/schema'

const CATEGORIES = ['Skincare', 'Makeup', 'Reviews', 'DIY', 'Lifestyle', 'Wellness']
const TAGLINES = ['Best Seller', "Editor's Pick", 'Top Rated', 'Fan Favourite', 'Budget Pick', 'Dermatologist Pick', '']
const WHERE_TO_BUY = ['Amazon', 'Nykaa', 'Flipkart', 'Myntra', 'Brand site', 'Other']

const input = 'w-full border border-border rounded-xl px-3 py-2 text-sm text-ink outline-none bg-cream-dark focus:border-plum transition-colors'

type Props = {
  action: (formData: FormData) => Promise<void>
  product?: Product
  isNew?: boolean
}

export default function ProductForm({ action, product, isNew = false }: Props) {
  return (
    <form action={action} className="flex flex-col gap-0">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-cream border-b border-border px-8 py-3 flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest uppercase text-plum">
          {isNew ? 'New product' : 'Edit product'}
        </p>
        <button
          type="submit"
          className="bg-plum text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          {isNew ? 'Create' : 'Save'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10 py-8 max-w-4xl">
        <Field label="Product name" required>
          <input name="name" required defaultValue={product?.name ?? ''} placeholder="e.g. Minimalist Niacinamide 10%" className={input} />
        </Field>

        <Field label="Brand">
          <input name="brand" defaultValue={product?.brand ?? ''} placeholder="e.g. Minimalist" className={input} />
        </Field>

        <Field label="Price (₹)" hint="Selling price">
          <input name="price" defaultValue={product?.price ?? ''} placeholder="₹349" className={input} />
        </Field>

        <Field label="MRP (₹)" hint="Original / crossed-out price">
          <input name="mrp" defaultValue={product?.mrp ?? ''} placeholder="₹499" className={input} />
        </Field>

        <Field label="Category">
          <select name="category" defaultValue={product?.category ?? 'Skincare'} className={input}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Tagline / badge">
          <select name="tagline" defaultValue={product?.tagline ?? ''} className={input}>
            {TAGLINES.map((t) => <option key={t} value={t}>{t || '— none —'}</option>)}
          </select>
        </Field>

        <Field label="Rating" hint="0.0 – 5.0">
          <input name="rating" type="number" step="0.1" min="0" max="5" defaultValue={String(product?.rating ?? '0')} className={input} />
        </Field>

        <Field label="Review count">
          <input name="reviews" type="number" min="0" defaultValue={product?.reviews ?? 0} className={input} />
        </Field>

        <Field label="Affiliate / buy link">
          <input name="link" type="url" defaultValue={product?.link ?? ''} placeholder="https://amzn.to/…" className={input} />
        </Field>

        <Field label="Where to buy">
          <select name="whereToBuy" defaultValue={product?.whereToBuy ?? 'Amazon'} className={input}>
            {WHERE_TO_BUY.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>

        <div className="flex gap-3 items-end">
          <Field label="Card colour" className="shrink-0">
            <input name="color" type="color" defaultValue={product?.color ?? '#e8d5e8'} className="w-10 h-9 rounded border border-border cursor-pointer" />
          </Field>
          <Field label="Cover image URL" className="flex-1">
            <input name="coverImage" type="url" defaultValue={product?.coverImage ?? ''} placeholder="https://…" className={input} />
          </Field>
        </div>

        <Field label="Tags" hint="Comma-separated">
          <input name="tags" defaultValue={product?.tags.join(', ') ?? ''} placeholder="niacinamide, brightening, oily skin…" className={input} />
        </Field>

        <div className="md:col-span-2">
          <Field label="Description">
            <textarea
              name="description"
              rows={4}
              defaultValue={product?.description ?? ''}
              placeholder="Short product description shown on the product card…"
              className={`${input} resize-none`}
            />
          </Field>
        </div>
      </div>
    </form>
  )
}

function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <p className="text-xs font-bold tracking-widest uppercase text-muted mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </p>
      {children}
      {hint && <p className="text-[10px] text-muted mt-1">{hint}</p>}
    </div>
  )
}
