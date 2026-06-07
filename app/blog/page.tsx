import PostCard from '@/app/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Todos os Artigos',
  description:
    'Leia os melhores artigos de tecnologia: comparativos de inteligência artificial, reviews de ferramentas e análises práticas.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Todos os Artigos</h1>
        <p className="text-gray-500">Reviews, comparativos e análises de tecnologia pelo Daniel SFR.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
