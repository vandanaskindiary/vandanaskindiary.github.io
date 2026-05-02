'use client'

import { deletePost } from './actions'

export default function DeletePostButton({ id }: { id: number }) {
  const action = deletePost.bind(null, id)
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm('Delete this post? This cannot be undone.')) e.preventDefault()
      }}
    >
      <button
        type="submit"
        className="text-sm font-semibold px-4 py-2 rounded-full border transition-colors hover:bg-red-50"
        style={{ borderColor: '#e8a0a0', color: '#c04040' }}
      >
        Delete post
      </button>
    </form>
  )
}
