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
    slug: 'rtx-5090-vs-rx-9070-xt-2026',
    title: 'RTX 5090 vs RX 9070 XT: Qual Placa de Vídeo Vale Mais em 2026?',
    excerpt:
      'NVIDIA lançou a RTX 5090 com arquitetura Blackwell enquanto a AMD surpreende com a RX 9070 XT por metade do preço. Veja benchmarks reais e qual comprar.',
    date: '07 de junho de 2026',
    readTime: '8 min',
    category: 'Hardware',
    content: `
## O cenário das GPUs em 2026

O mercado de placas de vídeo nunca esteve tão competitivo. A NVIDIA lançou a série RTX 5000 com a arquitetura Blackwell, prometendo até 2x mais desempenho que a geração anterior. Já a AMD contra-atacou com a RX 9070 XT oferecendo desempenho flagship por um preço bem mais acessível. Mas qual vale mais o seu dinheiro?

## RTX 5090 — O Monstro da NVIDIA

A **RTX 5090** é a GPU mais poderosa já lançada para o mercado consumidor. Com **32 GB de memória GDDR7**, núcleo GB202 com 21.760 CUDA cores e barramento de 512 bits, ela domina qualquer benchmark.

**Pontos fortes:**
- Melhor desempenho absoluto em ray tracing
- DLSS 4 com Multi Frame Generation (gera múltiplos frames por frame real)
- Ideal para criação de conteúdo: renderização 3D, edição de vídeo 8K
- Suporte a 4 monitores simultâneos

**Pontos fracos:**
- Preço: R$ 15.000 a R$ 18.000 no Brasil
- Consumo de 575W — exige fonte de 1000W+
- Enorme: ocupa 3 slots e exige gabinete extra grande

## RX 9070 XT — A Surpresa da AMD

A **RX 9070 XT** chegou com a arquitetura RDNA 4 e surpreendeu o mercado. Com **16 GB de memória GDDR6**, ela entrega desempenho que rivaliza com a RTX 4090 da geração anterior.

**Pontos fortes:**
- Preço: R$ 4.500 a R$ 5.500 no Brasil
- Desempenho excelente em rasterização (jogos tradicionais)
- Consumo de apenas 304W
- Driver muito melhorado com FSR 4

**Pontos fracos:**
- Ray tracing ainda inferior à NVIDIA
- Sem equivalente ao DLSS Multi Frame Generation
- Menos suporte em softwares de criação de conteúdo

## Benchmarks: Jogos em 4K

Em resolução 4K sem upscaling, a RTX 5090 domina: **Cyberpunk 2077** roda a 180 fps na 5090 contra 110 fps na RX 9070 XT. Em **Alan Wake 2** com ray tracing total, a diferença é ainda maior: 140 fps vs 65 fps.

Mas com DLSS 4 e FSR 4 habilitados, a RX 9070 XT chega próxima: **Cyberpunk 2077** com FSR 4 Quality: 145 fps vs 210 fps com DLSS 4 Performance. Uma diferença ainda grande, mas justifica quase R$ 12.000 a mais?

## Para Quem é Cada Uma?

A **RTX 5090** é para quem não aceita compromissos: streamers profissionais, editores de vídeo, entusiastas que querem o melhor absoluto e não olham para o preço.

A **RX 9070 XT** é para o gamer que quer jogar tudo no ultra em 4K com excelente desempenho, sem gastar uma fortuna. Para a grande maioria dos jogadores, ela é a escolha mais inteligente de 2026.

## Veredicto

Se você tem orçamento ilimitado: **RTX 5090**. Se você quer o melhor custo-benefício de 2026: **RX 9070 XT** sem dúvida. Ela entrega 70% do desempenho da RTX 5090 por 30% do preço.
    `.trim(),
  },
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
