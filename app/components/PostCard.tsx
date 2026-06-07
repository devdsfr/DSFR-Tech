import Link from 'next/link'
import type { Post } from '@/lib/posts'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wide">
        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{post.category}</span>
        <span>·</span>
        <time>{post.date}</time>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>
      <h2 className="text-lg font-bold text-gray-900 leading-snug">
        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-auto text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
      >
        Ler artigo
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  )
}
