'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { useRef, useState } from 'react'
import type { PostWithProducts } from '@/lib/db/queries'
import type { Product } from '@/lib/db/schema'

const CATEGORIES = ['Skincare', 'Makeup', 'Reviews', 'DIY', 'Lifestyle', 'Wellness']

type Props = {
  action: (formData: FormData) => Promise<void>
  post?: PostWithProducts
  allProducts: Product[]
  isNew?: boolean
}

export default function PostEditor({ action, post, allProducts, isNew = false }: Props) {
  const bodyRef = useRef<HTMLInputElement>(null)
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [selectedProductIds, setSelectedProductIds] = useState<Set<number>>(
    new Set(post?.products.map((p) => p.id) ?? [])
  )

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
      Placeholder.configure({ placeholder: 'Write your post here…' }),
    ],
    content: post?.bodyHtml ?? '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (bodyRef.current) bodyRef.current.value = editor.getHTML()
    },
  })

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function toggleProduct(id: number) {
    setSelectedProductIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function addLink() {
    const url = window.prompt('Link URL')
    if (!url) return
    editor?.chain().focus().toggleLink({ href: url }).run()
  }

  function addImage() {
    const url = window.prompt('Image URL')
    if (!url) return
    editor?.chain().focus().setImage({ src: url }).run()
  }

  const btn = (active: boolean) =>
    `px-2.5 py-1 rounded-lg text-xs font-bold transition-colors select-none cursor-pointer ${
      active ? 'bg-plum text-white' : 'text-muted hover:text-ink hover:bg-cream-dark'
    }`

  return (
    <form action={action} className="flex flex-col min-h-screen">
      <input type="hidden" name="bodyHtml" ref={bodyRef} defaultValue={post?.bodyHtml ?? ''} />
      <input type="hidden" name="productIds" value={Array.from(selectedProductIds).join(',')} readOnly />

      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-cream border-b border-border px-8 py-3 flex items-center justify-between gap-4">
        <p className="text-xs font-bold tracking-widest uppercase text-plum">
          {isNew ? 'New post' : 'Edit post'}
        </p>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-ink">
            <input type="checkbox" name="featured" defaultChecked={post?.featured ?? false} className="accent-plum w-4 h-4" />
            Featured
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-ink">
            <input type="checkbox" name="published" defaultChecked={post?.published ?? false} className="accent-plum w-4 h-4" />
            Published
          </label>
          <button
            type="submit"
            className="bg-plum text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {isNew ? 'Create' : 'Save'}
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Main area */}
        <div className="flex-1 min-w-0 px-10 py-8 flex flex-col gap-5">
          <input
            name="title"
            type="text"
            required
            defaultValue={post?.title ?? ''}
            placeholder="Post title…"
            onChange={(e) => { if (!post) setSlug(autoSlug(e.target.value)) }}
            className="font-serif text-4xl font-bold text-ink placeholder:text-border outline-none bg-transparent w-full border-b border-border pb-4"
          />

          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 border border-border rounded-xl px-3 py-2 bg-white">
            <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className={btn(!!editor?.isActive('bold'))}>B</button>
            <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className={btn(!!editor?.isActive('italic'))}>I</button>
            <button type="button" onClick={() => editor?.chain().focus().toggleStrike().run()} className={btn(!!editor?.isActive('strike'))}><s>S</s></button>
            <span className="w-px bg-border self-stretch mx-1" />
            <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(!!editor?.isActive('heading', { level: 2 }))}>H2</button>
            <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(!!editor?.isActive('heading', { level: 3 }))}>H3</button>
            <span className="w-px bg-border self-stretch mx-1" />
            <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className={btn(!!editor?.isActive('bulletList'))}>• List</button>
            <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={btn(!!editor?.isActive('orderedList'))}>1. List</button>
            <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className={btn(!!editor?.isActive('blockquote'))}>&#8220; Quote</button>
            <span className="w-px bg-border self-stretch mx-1" />
            <button type="button" onClick={addLink} className={btn(!!editor?.isActive('link'))}>Link</button>
            <button type="button" onClick={addImage} className={btn(false)}>Image</button>
            <button type="button" onClick={() => editor?.chain().focus().setHorizontalRule().run()} className={btn(false)}>—</button>
          </div>

          {/* Editor */}
          <div className="border border-border rounded-2xl overflow-hidden bg-white flex-1">
            <EditorContent
              editor={editor}
              className="prose-vsd max-w-none px-8 py-6 min-h-[480px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[480px]"
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-72 shrink-0 border-l border-border px-6 py-8 flex flex-col gap-5">
          <Field label="Slug">
            <input
              name="slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={input}
            />
          </Field>

          <Field label="Excerpt">
            <textarea
              name="excerpt"
              rows={3}
              defaultValue={post?.excerpt ?? ''}
              placeholder="Short summary for cards…"
              className={`${input} resize-none`}
            />
          </Field>

          <Field label="Category">
            <select name="category" defaultValue={post?.category ?? 'Skincare'} className={input}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>

          <div className="flex gap-3">
            <Field label="Read time" className="flex-1">
              <input name="readTime" defaultValue={post?.readTime ?? '5 min'} placeholder="5 min" className={input} />
            </Field>
            <Field label="Card colour">
              <input name="color" type="color" defaultValue={post?.color ?? '#e8d8e8'} className="w-10 h-9 rounded border border-border cursor-pointer" />
            </Field>
          </div>

          <Field label="Cover image URL">
            <input name="coverImage" type="url" defaultValue={post?.coverImage ?? ''} placeholder="https://…" className={input} />
          </Field>

          <Field label="Tags" hint="Comma-separated">
            <input name="tags" defaultValue={post?.tags.join(', ') ?? ''} placeholder="niacinamide, oily skin…" className={input} />
          </Field>

          <Field label="Publish date">
            <input
              name="publishedAt"
              type="datetime-local"
              defaultValue={post?.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : ''}
              className={input}
            />
          </Field>

          <details>
            <summary className="cursor-pointer text-xs font-bold tracking-widest uppercase text-muted mb-3">SEO ▾</summary>
            <div className="flex flex-col gap-3 mt-1">
              <input name="seoTitle" defaultValue={post?.seoTitle ?? ''} placeholder="SEO title" className={input} />
              <textarea name="seoDescription" rows={2} defaultValue={post?.seoDescription ?? ''} placeholder="Meta description" className={`${input} resize-none`} />
              <input name="ogImage" type="url" defaultValue={post?.ogImage ?? ''} placeholder="OG image URL" className={input} />
            </div>
          </details>

          {allProducts.length > 0 && (
            <Field label="Linked products">
              <div className="flex flex-col gap-1 max-h-52 overflow-y-auto mt-1">
                {allProducts.map((p) => (
                  <label key={p.id} className="flex items-center gap-2 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={selectedProductIds.has(p.id)}
                      onChange={() => toggleProduct(p.id)}
                      className="accent-plum w-4 h-4 shrink-0"
                    />
                    <span className="text-xs text-ink truncate">{p.name}</span>
                  </label>
                ))}
              </div>
            </Field>
          )}
        </aside>
      </div>
    </form>
  )
}

const input = 'w-full border border-border rounded-xl px-3 py-2 text-sm text-ink outline-none bg-cream-dark focus:border-plum transition-colors'

function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string
  hint?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <p className="text-xs font-bold tracking-widest uppercase text-muted mb-1.5">{label}</p>
      {children}
      {hint && <p className="text-[10px] text-muted mt-1">{hint}</p>}
    </div>
  )
}
