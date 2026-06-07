import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre — DSFR Tech',
  description:
    'Conheça o DSFR Tech, o blog de tecnologia do Daniel SFR com reviews honestos e comparativos de ferramentas digitais.',
}

export default function SobrePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Sobre o DSFR Tech</h1>
        <p className="text-gray-500 text-lg">Reviews honestos. Decisões inteligentes.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">
            D
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Daniel SFR</h2>
            <p className="text-gray-500 text-sm">Criador do DSFR Tech</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          Olá! Sou o Daniel — apaixonado por tecnologia, produtividade e ferramentas digitais. Criei o <strong>DSFR Tech</strong> para compartilhar análises honestas e comparativos práticos de tudo que envolve tecnologia no dia a dia.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Aqui você encontra reviews de ferramentas de IA, comparativos de softwares, guias de produtividade e tudo que ajuda você a trabalhar mais inteligente — não mais difícil.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: '🤖', title: 'Inteligência Artificial', desc: 'Reviews de ChatGPT, DeepSeek, Claude e mais' },
          { icon: '🛠️', title: 'Ferramentas Digitais', desc: 'Comparativos de softwares e apps de produtividade' },
          { icon: '📊', title: 'Análises Práticas', desc: 'Dados reais, sem hype, para você decidir melhor' },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-2xl mb-2">{item.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
            <p className="text-gray-500 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/blog"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver todos os artigos →
        </Link>
      </div>
    </div>
  )
}
