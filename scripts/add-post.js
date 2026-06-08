#!/usr/bin/env node
/**
 * Insere um novo post no início do array posts em lib/posts.ts
 * Uso: node scripts/add-post.js /tmp/new-post.json
 */
const fs = require('fs')
const path = require('path')

const jsonPath = process.argv[2] || '/tmp/new-post.json'
const postsPath = path.join(__dirname, '..', 'lib', 'posts.ts')

const post = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

// Valida campos obrigatórios
const required = ['slug', 'title', 'excerpt', 'date', 'readTime', 'category', 'content']
for (const field of required) {
  if (!post[field]) throw new Error(`Campo obrigatório ausente: ${field}`)
}

// Gera o bloco TypeScript do novo post
const coverImageLine = post.coverImage ? `\n    coverImage: ${JSON.stringify(post.coverImage)},` : ''
const postBlock = `  {
    slug: ${JSON.stringify(post.slug)},
    title: ${JSON.stringify(post.title)},
    excerpt:
      ${JSON.stringify(post.excerpt)},
    date: ${JSON.stringify(post.date)},
    readTime: ${JSON.stringify(post.readTime)},
    category: ${JSON.stringify(post.category)},${coverImageLine}
    content: \`
${post.content}
    \`.trim(),
  },`

// Lê o arquivo atual
let content = fs.readFileSync(postsPath, 'utf8')

// Verifica se slug já existe
if (content.includes(`slug: '${post.slug}'`) || content.includes(`slug: "${post.slug}"`)) {
  console.error(`ERRO: slug '${post.slug}' já existe no arquivo`)
  process.exit(1)
}

// Insere após a abertura do array
const marker = 'export const posts: Post[] = ['
const insertPos = content.indexOf(marker) + marker.length
if (insertPos === marker.length - 1) {
  console.error('ERRO: marcador do array não encontrado')
  process.exit(1)
}

content = content.slice(0, insertPos) + '\n' + postBlock + '\n' + content.slice(insertPos)

// Escreve o arquivo completo
fs.writeFileSync(postsPath, content, 'ut
