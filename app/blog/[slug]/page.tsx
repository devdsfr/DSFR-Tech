import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import Comments from '@/app/components/Comments'

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
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  }
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          {line.replace('## ', '')}
        </h2>
      )
    // H3
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-xl font-semibold text-gray-800 mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      )
    // Image: ![caption](url)
    } else if (/^!\[.*\]\(.*\)$/.test(line.trim())) {
      const match = line.match(/^!\[(.*)\]\((.*)\)$/)
      if (match) {
        const [, caption, url] = match
        elements.push(
          <figure key={key++} className="my-8">
            <img
              src={url}
              alt={caption}
              className="w-full rounded-lg object-cover max-h-[500px]"
              loading="lazy"
            />
            {caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
                {caption}
              </figcaption>
            )}
          </figure>
        )
      }
    // Table row
    } else if (line.startsWith('|')) {
      const cells = line.split('|').filter((c) => c.trim() !== '')
      const isSeparator = cells.every((c) => /^[-:]+$/.test(c.trim()))
      if (!isSeparator) {
        elements.push(
          <tr key={key++}>
            {cells.map((cell, i) => (
              <td key={i} className="border border-gray-200 px-3 py-2 text-sm text-gray-700">
                {cell.trim()}
              </td>
            ))}
          </tr>
        )
      }
    // List item
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <li key={key++} className="ml-5 list-disc text-gray-700">
          {parseBold(line.slice(2))}
        </li>
      )
    // Blank line
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />)
    // Regular paragraph
    } else {
      elements.push(
        <p key={key++} className="text-gray-700 leading-relaxed">
          {parseBold(line)}
        </p>
      )
    }
  }

  // Wrap consecutive <tr> in a table
  const wrapped: React.ReactNode[] = []
  let tableRows: React.ReactNode[] = []
  for (const el of elements) {
    if ((el as any)?.type === 'tr') {
      tableRows.push(el)
    } else {
      if (tableRows.length > 0) {
        wrapped.push(
          <div key={`tbl-${wrapped.length}`} className="my-6 overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left">
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        )
        tableRows = []
      }
      wrapped.
push(el)
    }
  }
  if (tableRows.length > 0) {
    wrapped.push(
      <div key={`tbl-${wrapped.length}`} className="my-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left">
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    )
  }

  return wrapped
}

function parseBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) =>
    part.startsWith('**') ? <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong> : part
  )
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
      <header className="mb-8">
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

      {/* Cover Image */}
      {post.coverImage && (
        <figure className="mb-10">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-xl object-cover max-h-[480px]"
          />
        </figure>
      )}

      {/* Content */}
      <div className="prose-blog space-y-2">
        {renderContent(post.content)}
      </div>

      {/* Comments */}
      <Comments />

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
