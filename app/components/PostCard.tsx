import Link from 'next/link'
import type { Post } from '@/lib/posts'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col overflow-hidden group">
      {/* Cover image */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden h-44 bg-gradient-to-br from-blue-50 to-indigo-100 flex-shrink-0">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">
            💻
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wide">
          <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-semibold">{post.category}</span>
          <span>·</span>
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h2 className="text-base font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto pt-2 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          Ler artigo
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
