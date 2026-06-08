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
