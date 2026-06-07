import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++}>{line.replace('## ', '')}</h2>)
    } else if (line.trim() === '') {
      elements.push(<br key={key++} />)
    } else {
      // parse bold **text**
      const parts = line.split(/(\*\*[^*]+\*\*)/)
      const parsed = parts.map((part, i) =>
        part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
      )
      elements.push(<p key={key++}>{parsed}</p>)
    }
  }
  return elements
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-gray-600 truncate">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wide mb-4">
          <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{post.category}</span>
          <span>·</span>
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.readTime} de leitura</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">{post.title}</h1>
        <p className="text-lg text-gray-500 leading-relaxed">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-3 pt-6 border-t border-gray-100">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Daniel SFR</p>
            <p className="text-xs text-gray-400">DSFR Tech</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose-blog">
        {renderContent(post.content)}
      </div>

      {/* Footer CTA */}
      <div className="mt-14 pt-8 border-t border-gray-200 flex items-center justify-between">
        <Link href="/blog" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Todos os artigos
        </Link>
        <span className="text-xs text-gray-400">© DSFR Tech · by Daniel SFR</span>
      </div>
    </div>
  )
}
