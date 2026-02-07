# 📦 StockMaster Pro - SaaS White-Label de Gestão de Estoque

O **StockMaster Pro** é uma plataforma SaaS moderna, robusta e totalmente personalizável (white-label), projetada para atender pequenas e médias empresas que necessitam de um controle rigoroso de inventário, movimentações e gestão de parceiros (clientes e fornecedores).

## 🚀 Visão Geral do Produto

Este sistema foi construído com foco em **escalabilidade e revenda**. Como um template white-label, ele permite que agências ou desenvolvedores alterem a identidade visual (logo, cores, nome) em tempo real, oferecendo uma experiência de marca própria para cada cliente final.

---

## 🛠️ Arquitetura Técnica

- **Framework:** React 19 (ES6+ Modules)
- **Linguagem:** TypeScript (Tipagem estrita para segurança de dados)
- **Estilização:** Tailwind CSS (Design Utility-First)
- **Ícones:** Lucide React (Outline style corporativo)
- **Gráficos:** Recharts (Visualização de dados performática)
- **Context API:** Gerenciamento de estado global para Branding e Autenticação.

---

## 📋 Módulos e Funcionalidades

### 1. Landing Page (Marketing & Vendas)
- Design focado em conversão com seções de Funcionalidades, Planos e White-label.
- Integração direta com **WhatsApp** para fechamento de vendas automatizado.
- Demonstração visual das capacidades de personalização.

### 2. Dashboard Administrativo (Inteligência de Dados)
- **KPI Cards:** Total de produtos, valor financeiro em estoque, volume de saídas e alertas críticos.
- **Gráficos em Tempo Real:** Curva de movimentação (Entradas vs. Saídas) e distribuição por categoria.
- **Feed de Estoque Crítico:** Alertas automáticos para itens abaixo do estoque mínimo.

### 3. Gestão de Catálogo (Produtos)
- CRUD completo (Criação, Leitura, Atualização e Exclusão).
- Controle por **SKU** e categorias.
- Sistema de monitoramento de saúde de estoque (Em Estoque, Baixo, Indisponível).
- Exportação de dados em CSV.

### 4. Controle de Movimentações (Stock Flow)
- Fluxo de **Entrada** (compras/devoluções) e **Saída** (vendas/perdas).
- Histórico detalhado com carimbo de data, hora e operador responsável.
- Lógica de saldo automatizada.

### 5. CRM & SRM (Clientes e Fornecedores)
- Cadastro completo de parceiros comerciais.
- Histórico de interação (últimas compras e status de atividade).
- Filtros inteligentes para busca rápida.

### 6. Relatórios & Auditoria
- Visualização consolidada de métricas financeiras (Ticket Médio, Giro de Estoque).
- **Gerador de Relatório Anual:** Simulação de processamento pesado com feedback visual (Loader/ProgressBar) e exportação em PDF.

### 7. Configurações & White-Label
- **Identidade Visual:** Alteração de nome, emoji-logo e paleta de cores (`--primary-color`) com persistência em tempo real.
- **Gestão de Time:** Criação de usuários com níveis de acesso (Admin, Operador, Leitor).
- **Segurança:** Ativação de 2FA (Simulado), Logs de Auditoria (IP, Ação, Data) e reset de segurança.

---

## 🎨 Guia de Customização (White-Label)

O sistema utiliza variáveis de ambiente CSS (`CSS Variables`) injetadas via JavaScript para garantir que a mudança de cor reflita em todo o ecossistema:

1. Acesse **Configurações > Identidade Visual**.
2. Altere o **Nome da Empresa**.
3. Selecione uma cor da paleta ou insira um código Hexadecimal.
4. O sistema atualizará automaticamente:
   - Cores de botões, ícones, gráficos e estados ativos de menu.
   - Sombra e anéis de foco.
   - Logo no Header, Sidebar e Landing Page.

---

## 🔐 Níveis de Permissão

- **Administrador:** Acesso total a configurações, relatórios financeiros e gestão de usuários.
- **Operador:** Focado em Produtos, Estoque e Clientes. Sem acesso a configurações sensíveis.
- **Leitor:** Acesso apenas de visualização (Read-only) para auditoria e conferência.

---

## 📈 Roadmap de Evolução
- [ ] Integração real com Backend (Node.js/Python).
- [ ] Leitor de Código de Barras via Câmera.
- [ ] Módulo de Vendas (PDV) integrado.
- [ ] Notificações Push para estoque baixo.

---
*Documentação gerada para StockMaster Pro - SaaS Template.*