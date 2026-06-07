import Link from 'next/link'
import PostCard from '@/app/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DSFR Tech — Reviews e Comparativos de Tecnologia',
  description:
    'Comparativos detalhados de ferramentas de tecnologia, inteligência artificial e softwares para você tomar decisões mais inteligentes.',
}

export default function Home() {
  const posts = getAllPosts()
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <section className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          ✦ Reviews honestos. Decisões inteligentes.
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Tecnologia explicada<br />
          <span className="text-blue-600">de forma clara</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Comparativos, reviews e análises de ferramentas digitais e inteligência artificial — pelo Daniel SFR.
        </p>
      </section>

      {/* Post em destaque */}
      {featured && (
        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Artigo em destaque</h2>
          <Link href={`/blog/${featured.slug}`} className="group block bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all p-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">
              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{featured.category}</span>
              <span>·</span>
              <time>{featured.date}</time>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
              {featured.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{featured.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
              Ler artigo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </section>
      )}

      {/* Outros posts */}
      {rest.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Mais artigos</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-16 bg-blue-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Quer acompanhar os próximos artigos?</h2>
        <p className="text-blue-100 mb-6">Novos comparativos e reviews toda semana.</p>
        <Link
          href="/blog"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Ver todos os artigos →
        </Link>
      </section>
    </div>
  )
}
