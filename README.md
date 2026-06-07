# DSFR Tech

Blog de tecnologia do Daniel SFR — reviews honestos e comparativos de ferramentas digitais.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Deploy

Projeto configurado para deploy no **Vercel**. Conecte o repositório e faça deploy com um clique.

## Estrutura

```
app/
  page.tsx           # Homepage
  blog/
    page.tsx         # Lista de artigos
    [slug]/
      page.tsx       # Artigo individual
  sobre/
    page.tsx         # Sobre o blog
  components/        # Header, Footer, PostCard
lib/
  posts.ts           # Dados dos posts
```

## Adicionar novos artigos

Edite `lib/posts.ts` e adicione um novo objeto ao array `posts`.
