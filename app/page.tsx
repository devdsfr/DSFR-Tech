import Link from 'next/link'
import PostCard from '@/app/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DSFR Tech — Reviews e Comparativos de Tecnologia',
  description:
    'Comparativos detalhados de ferramentas de tecnologia, inteligência artificial e softwares para você tomar decisões mais inteligentes.',
}

const debates = [
  {
    emoji: '🤖',
    title: 'ChatGPT vs Claude',
    desc: 'Qual IA escreve melhor em 2026?',
    heat: 98,
    href: '/blog',
    color: 'from-violet-500 to-purple-600',
  },
  {
    emoji: '🎮',
    title: 'RTX 5060 Ti vs RX 7800 XT',
    desc: 'Custo-benefício real em 1440p',
    heat: 95,
    href: '/blog',
    color: 'from-green-500 to-emerald-600',
  },
  {
    emoji: '⚡',
    title: 'AMD vs Intel 2026',
    desc: 'Quem domina em edição de vídeo?',
    heat: 91,
    href: '/blog',
    color: 'from-orange-500 to-red-500',
  },
  {
    emoji: '💾',
    title: 'SSD NVMe vs SATA',
    desc: 'Vale pagar mais pelo NVMe?',
    heat: 84,
    href: '/blog',
    color: 'from-blue-500 to-cyan-600',
  },
]

export default function Home() {
  const posts = getAllPosts()
  const featured = posts[0]
  const rest = posts.slice(1, 7)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">

      {/* ── HERO ── */}
      <section className="py-14 text-center relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#eff6ff_0%,_transparent_70%)]" />
        <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-5 shadow">
          ✦ Reviews honestos · Decisões inteligentes
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
          O tech que você precisa<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
            explicado de verdade
          </span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          Benchmarks reais, comparativos sem papo furado e análises de IA — pelo Daniel SFR.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/blog" className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
            Ver todos os artigos →
          </Link>
          <a href="#debates" className="text-gray-600 font-medium px-5 py-2.5 rounded-xl border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors">
            🔥 Ver debates
          </a>
        </div>
      </section>

      {/* ── POST EM DESTAQUE ── */}
      {featured && (
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">⭐ Em destaque</span>
          </div>
          <Link href={`/blog/${featured.slug}`} className="group block rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all bg-white">
            {featured.coverImage && (
              <div className="h-64 sm:h-80 overflow-hidden">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-7">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">{featured.category}</span>
                <span>·</span>
                <time>{featured.date}</time>
                <span>·</span>
                <span>{featured.readTime} de leitura</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                {featured.title}
              </h2>
              <p className="text-gray-500 leading-relaxed max-w-2xl">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
                Ler artigo completo
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* ── RANKING DE DEBATES ── */}
      <section id="debates" className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black text-gray-900">🔥 Debates em Alta</h2>
            <p className="text-sm text-gray-400 mt-0.5">Os temas mais quentes da comunidade tech</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {debates.map((d, i) => (
            <Link key={i} href={d.href} className="group flex items-center gap-4 bg-white border border-gray-200 hover:border-transparent hover:shadow-lg rounded-xl p-4 transition-all">
              {/* Rank */}
              <span className="text-2xl font-black text-gray-200 w-6 flex-shrink-0 text-center leading-none">
                {i + 1}
              </span>
              {/* Emoji badge */}
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}>
                {d.emoji}
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors truncate">{d.title}</p>
                <p className="text-xs text-gray-400 truncate">{d.desc}</p>
              </div>
              {/* Heat bar */}
              <div className="flex-shrink-0 text-right">
                <p className="text-xs font-bold text-orange-500">{d.heat}°</p>
                <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full" style={{width: `${d.heat}%`}} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── MAIS ARTIGOS ── */}
      {rest.length > 0 && (
        <section className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-gray-900">📰 Mais artigos</h2>
            <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Ver todos →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="mb-14 rounded-2xl overflow-hidden relative">
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-8 sm:p-10 text-center text-white">
          <div className="absolute inset-0 opacity-10"
            style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px'}}
          />
          <h2 className="text-2xl sm:text-3xl font-black mb-2 relative">Não perca os próximos reviews</h2>
          <p className="text-blue-100 mb-6 relative">Novos comparativos e análises toda semana.</p>
          <Link
            href="/blog"
            className="inline-block bg-white text-blue-600 font-black px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg relative"
          >
            Ver todos os artigos →
          </Link>
        </div>
      </section>

    </div>
  )
}
