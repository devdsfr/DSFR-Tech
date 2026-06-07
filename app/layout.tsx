import type { Metadata } from 'next'
import './globals.css'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'DSFR Tech — Reviews e Comparativos de Tecnologia',
    template: '%s | DSFR Tech',
  },
  description:
    'Comparativos detalhados de ferramentas de tecnologia, inteligência artificial e softwares para você tomar decisões mais inteligentes.',
  metadataBase: new URL('https://dsfr-tech.vercel.app'),
  openGraph: {
    siteName: 'DSFR Tech',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
