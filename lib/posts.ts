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
    slug: 'melhores-processadores-custo-beneficio-2026-06-07',
    title: 'Melhores Processadores Custo-Benefício de 2026: Do R$800 ao R$3.000',
    excerpt:
      'Ryzen 5 9600X, Core Ultra 5 245K ou Ryzen 7 9700X? Analisamos os melhores processadores por faixa de preço em 2026 para gaming, trabalho e uso geral.',
    date: '07 de junho de 2026',
    readTime: '9 min',
    category: 'Hardware',
    content: `
## Por que o processador ainda importa em 2026?

Em 2026, o processador continua sendo determinante para **jogos competitivos em alta taxa de quadros** e para **produtividade e multitarefa**. Escolher um CPU fraco pode desperdiçar o potencial de uma GPU de R$ 4.000 ou tornar seu computador obsoleto antes do esperado.

## Faixa de entrada (até R$ 1.000): Ryzen 5 9600X domina

O **AMD Ryzen 5 9600X** com arquitetura **Zen 5** traz salto de IPC de ~16%, 6 núcleos/12 threads, clock boost de até 5,4 GHz e TDP de apenas 65W. Preço: R$ 900 a R$ 1.100.

Desempenho em jogos: Counter-Strike 2 em 1080p ~520 fps, Cyberpunk 2077 Ultra 1080p ~145 fps, Fortnite Competitivo ~380 fps.

## Faixa intermediária (R$ 1.000 a R$ 2.000)

O **Ryzen 7 9700X** com 8 núcleos/16 threads, TDP de 65W e clock de 5,5 GHz é o processador mais equilibrado do mercado gamer. Preço: R$ 1.600 a R$ 1.900.

O **Core Ultra 7 265K** da Intel traz 20 núcleos (8P + 12E) para workloads que escalam com muitos threads. Preço: R$ 1.900 a R$ 2.200. Consumo: até 253W.

## Faixa alta (R$ 2.000 a R$ 3.500)

O **Ryzen 9 9900X** com 12 núcleos/24 threads e 5,6 GHz é ideal para renderização 3D e edição de vídeo. Preço: R$ 2.400 a R$ 2.800.

O **Core Ultra 9 285K** com 24 núcleos domina workloads altamente paralelizados. Preço: R$ 3.000 a R$ 3.500.

## Tabela comparativa

| Processador | Núcleos | Boost | TDP | Preço BR |
|---|---|---|---|---|
| Ryzen 5 9600X | 6C/12T | 5,4 GHz | 65W | R$ 950 |
| Ryzen 7 9700X | 8C/16T | 5,5 GHz | 65W | R$ 1.750 |
| Core Ultra 7 265K | 20C/20T | 5,5 GHz | 125W | R$ 2.100 |
| Ryzen 9 9900X | 12C/24T | 5,6 GHz | 120W | R$ 2.600 |
| Core Ultra 9 285K | 24C/24T | 5,7 GHz | 125W | R$ 3.200 |

## Conclusão

Para **gaming puro**: **Ryzen 5 9600X** (entrada) ou **Ryzen 7 9700X** (melhor custo-benefício). Para **produtividade intensa**: **Core Ultra 7 265K** ou **Core Ultra 9 285K** quando o uso vai além dos jogos.
    `.trim(),
  },
  {
    slug: 'melhores-ssds-para-ps5-2026-06-07',
    title: 'Melhores SSDs para PS5 em 2026: Expanda Seu Armazenamento Sem Errar na Escolha',
    excerpt:
      'O PS5 aceita SSDs M.2 NVMe com velocidades a partir de 5.500 MB/s, mas qual comprar? Analisamos as melhores opções do mercado por preço, desempenho e compatibilidade.',
    date: '07 de junho de 2026',
    readTime: '8 min',
    category: 'Console & Gaming',
    content: `
## Por que expandir o armazenamento do PS5?

O PlayStation 5 vem de fábrica com apenas **825 GB de SSD interno** (667 GB disponíveis). Em 2026, com God of War Ragnarök exigindo 90 GB e Call of Duty ultrapassando 200 GB, esse limite é atingido rapidamente.

## Requisitos técnicos do PS5

Interface M.2 NVMe (PCIe Gen 4), velocidade mínima de **5.500 MB/s**, formato M.2 2280 (mais comum), capacidade de 250 GB a 4 TB.

## Samsung 990 Pro — O mais equilibrado

Leitura de **7.450 MB/s** e gravação de **6.900 MB/s**. Preços: 1 TB R$ 450-550 | 2 TB R$ 750-900 | 4 TB R$ 1.500-1.800. Versão com heatsink disponível e recomendada.

## WD Black SN850X — Velocidade máxima

Leitura de **7.300 MB/s** com Game Mode 2.0 otimizado para gaming. 1 TB: R$ 500-600 | 2 TB: R$ 800-950.

## Seagate FireCuda 530 — Validação PlayStation

Com validação oficial da PlayStation. Leitura 7.300 MB/s, gravação 6.900 MB/s. 1 TB: R$ 480-580 | 2 TB: R$ 780-920.

## Kingston Fury Renegade — Melhor custo-benefício

Leitura 7.300 MB/s, gravação 7.000 MB/s. 1 TB: R$ 400-480 | 2 TB: R$ 680-800.

## Como instalar o SSD no PS5

1. Desligue o PS5 completamente e desconecte os cabos
2. Remova a tampa lateral do console
3. Localize o slot M.2 e remova a tampa com chave Phillips
4. Insira o SSD no ângulo correto (~30°) e fixe com o parafuso
5. Recoloque as tampas e ligue o PS5 — detecta automaticamente e solicita formatação

## Conclusão

Para a maioria: **Samsung 990 Pro de 1 TB com heatsink** — mais seguro e equilibrado. Para mais espaço com economia: **Kingston Fury Renegade de 2 TB**. Evite SSDs PCIe Gen 3 — velocidades abaixo do SSD original do console.
    `.trim(),
  },
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

A NVIDIA lançou a série RTX 5000 com a arquitetura Blackwell, prometendo até 2x mais desempenho que a geração anterior. A AMD contra-atacou com a RX 9070 XT por metade do preço.

## RTX 5090 — O Monstro da NVIDIA

Com **32 GB de GDDR7**, 21.760 CUDA cores e barramento de 512 bits. DLSS 4 com Multi Frame Generation. Preço: R$ 15.000 a R$ 18.000. Consumo: 575W — exige fonte de 1000W+.

## RX 9070 XT — A Surpresa da AMD

Com **16 GB de GDDR6** e arquitetura RDNA 4, rivaliza com a RTX 4090 da geração anterior. Preço: R$ 4.500 a R$ 5.500. Consumo: 304W. FSR 4 muito melhorado.

## Benchmarks em 4K

Cyberpunk 2077: 180 fps (RTX 5090) vs 110 fps (RX 9070 XT). Alan Wake 2 com ray tracing: 140 fps vs 65 fps.

Com upscaling: Cyberpunk 2077 com FSR 4 Quality atinge 145 fps vs 210 fps com DLSS 4 Performance.

## Veredicto

Orçamento ilimitado: **RTX 5090**. Melhor custo-benefício de 2026: **RX 9070 XT** — 70% do desempenho da RTX 5090 por 30% do preço.
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

O **ChatGPT** da OpenAI é a IA mais conhecida do mundo, com suporte a imagens, voz e dezenas de integrações. O **DeepSeek** foi lançado em janeiro de 2025 por uma empresa chinesa, oferecendo desempenho comparável de forma gratuita e com código aberto.

## Desempenho e Benchmarks

DeepSeek R1 alcança **97,3% no benchmark MATH-500** vs 60,3% do GPT-4o. Em criatividade e tarefas multimídia, o ChatGPT ainda é superior. Para programação, os dois são excelentes — DeepSeek V3 atinge 91% no SWE-Bench.

## Preço: A Maior Diferença

**US$ 0,28 por milhão de tokens no DeepSeek V3** vs US$ 30 no GPT-4o — mais de 100 vezes mais barato. O treinamento do DeepSeek R1 custou US$ 294 mil vs US$ 80-100 milhões do GPT-4.

## Privacidade e Segurança

O **DeepSeek roteia dados para servidores na China**, sujeitos à Lei de Inteligência Nacional de 2017. O **ChatGPT opera nos EUA e Europa** com regulações mais transparentes. Para dados sensíveis, evite o DeepSeek.

## Veredicto Final

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

O mercado de ferramentas de IA explodiu em 2025-2026. Com dezenas de opções disponíveis, escolher as certas pode economizar horas por semana.

## 1. ChatGPT (OpenAI)

Ainda o mais versátil. Ideal para redação, análise de documentos, programação e criação de conteúdo. O plano Plus por US$ 20/mês dá acesso ao GPT-4o.

## 2. DeepSeek

Gratuito e excepcionalmente bom em raciocínio matemático e programação. Perfeito como alternativa ao ChatGPT para tarefas técnicas.

## 3. Perplexity AI

O melhor para pesquisa. Combina busca na web em tempo real com respostas em linguagem natural.

## 4. Cursor

Editor de código com IA integrada. Completa, refatora e explica código com contexto completo do projeto.

## 5. Notion AI

Integrado ao Notion, ideal para quem já usa a ferramenta para notas e documentação.

## 6. Claude (Anthropic)

Excepcional para análise de documentos longos e escrita mais nuançada. O plano gratuito já é muito capaz.

## 7. Midjourney

Para geração de imagens, ainda lidera em qualidade estética. Indispensável para criadores de conteúdo visual.

## Conclusão

A combinação ideal: **ChatGPT ou Claude** para texto, **DeepSeek** para código e análise, **Perplexity** para pesquisa, e **Cursor** para desenvolvimento.
    `.trim(),
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllPosts(): Post[] {
  return posts
}
