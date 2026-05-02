import { createPost } from '../actions'
import PostEditor from '../PostEditor'
import { listProducts } from '@/lib/db/queries'

export default async function NewPostPage() {
  const allProducts = await listProducts()
  return <PostEditor action={createPost} allProducts={allProducts} isNew />
}
