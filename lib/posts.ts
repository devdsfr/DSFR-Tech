export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  content: string
}

export const posts: Post[] = [
  {
    slug: 'deepseek-vs-chatgpt-2026',
    title: 'DeepSeek vs ChatGPT: Qual IA é Melhor em 2026?',
    excerpt:
      'Comparamos desempenho, preço e privacidade das duas IAs mais usadas do mundo. O DeepSeek é 100x mais barato, mas vale a troca? Veja os benchmarks reais.',
    date: '06 de junho de 2026',
    readTime: '7 min',
    category: 'Inteligência Artificial',
    content: `
## O que é cada uma?

O **ChatGPT** é desenvolvido pela OpenAI desde novembro de 2022. É a IA mais conhecida do mundo, com versões gratuitas e pagas, suporte a imagens, voz e integração com dezenas de ferramentas. O modelo mais avançado é o GPT-4o.

O **DeepSeek** foi lançado em janeiro de 2025 por uma empresa chinesa chamada High-Flyer. Subiu rapidamente para o topo das lojas de aplicativos ao oferecer desempenho comparável ao ChatGPT, de forma gratuita e com código aberto.

## Desempenho e Benchmarks

Em **raciocínio e matemática**, o DeepSeek R1 se destaca: alcança **97,3% no benchmark MATH-500**, enquanto o GPT-4o marca 60,3% no mesmo teste. Para tarefas de lógica e problemas complexos passo a passo, o DeepSeek leva vantagem clara.

Em **criatividade, redação e tarefas multimídia**, o ChatGPT ainda é superior. Ele entende imagens, gera conteúdo em múltiplos formatos e tem melhor desempenho em textos de marketing e storytelling.

Para **programação**, os dois são excelentes — o DeepSeek V3 atinge 91% no SWE-Bench.

## Preço: A Maior Diferença

O DeepSeek vence com folga. O custo por milhão de tokens de saída é **US$ 0,28 no DeepSeek V3**, contra **US$ 30 no GPT-4o** — mais de 100 vezes mais barato.

Para uso pessoal, o DeepSeek é completamente gratuito sem restrições de modelo. O ChatGPT oferece plano gratuito limitado e Plus por US$ 20/mês.

O treinamento do DeepSeek R1 custou US$ 294 mil. O GPT-4 custou entre US$ 80 e 100 milhões — mais de 300 vezes mais caro.

## Privacidade e Segurança

Este é o ponto mais crítico. O **DeepSeek roteia dados dos usuários para servidores na China**, onde a Lei de Inteligência Nacional de 2017 obriga empresas a cooperar com o governo chinês quando solicitado. Pesquisadores de segurança também identificaram que o DeepSeek transmite dados para infraestrutura ligada à ByteDance.

O **ChatGPT opera com servidores nos EUA e Europa**, sob regulações mais transparentes. Para dados sensíveis de empresas ou informações confidenciais, evite o DeepSeek.

## Veredicto Final

Não existe uma resposta única. O DeepSeek é extraordinariamente capaz para raciocínio e custa muito menos. O ChatGPT é mais versátil, mais integrado ao ecossistema de ferramentas e mais confiável em termos de privacidade.

**Use o DeepSeek** para rascunhos, análises e código. **Use o ChatGPT** para conteúdo final, criativo e profissional. As duas IAs juntas cobrem praticamente qualquer necessidade.
    `.trim(),
  },
  {
    slug: 'melhores-ferramentas-ia-2026',
    title: 'As 7 Melhores Ferramentas de IA para Produtividade em 2026',
    excerpt:
      'Do ChatGPT ao Notion AI, passando por Perplexity e Cursor: quais ferramentas de inteligência artificial realmente valem o investimento em 2026?',
    date: '01 de junho de 2026',
    readTime: '6 min',
    category: 'Ferramentas',
    content: `
## Por que ferramentas de IA importam agora?

O mercado de ferramentas de IA explodiu em 2025-2026. Com dezenas de opções disponíveis, escolher as certas pode economizar horas por semana. Neste artigo, listamos as 7 que realmente fazem diferença no dia a dia.

## 1. ChatGPT (OpenAI)

Ainda o mais versátil. Ideal para redação, análise de documentos, programação e criação de conteúdo. O plano Plus por US$ 20/mês dá acesso ao GPT-4o com capacidades multimodais.

## 2. DeepSeek

Gratuito e excepcionalmente bom em raciocínio matemático e programação. Perfeito como alternativa ao ChatGPT para tarefas técnicas.

## 3. Perplexity AI

O melhor para pesquisa. Combina busca na web em tempo real com respostas em linguagem natural. Substitui o Google para muitas consultas.

## 4. Cursor

Editor de código com IA integrada. Se você programa, o Cursor transforma sua produtividade. Completa, refatora e explica código com contexto completo do projeto.

## 5. Notion AI

Integrado ao Notion, ideal para quem já usa a ferramenta para notas e documentação. Resume, traduz e gera conteúdo dentro do seu workspace.

## 6. Claude (Anthropic)

Excepcional para análise de documentos longos e escrita mais nuançada. O plano gratuito já é muito capaz.

## 7. Midjourney

Para geração de imagens, ainda lidera em qualidade estética. Indispensável para criadores de conteúdo visual.

## Conclusão

Para uma rotina de produtividade, a combinação ideal é: **ChatGPT ou Claude** para texto, **DeepSeek** para código e análise, **Perplexity** para pesquisa, e **Cursor** para desenvolvimento.
    `.trim(),
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllPosts(): Post[] {
  return posts
}
