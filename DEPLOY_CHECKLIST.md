# ✅ Checklist de Deploy - StockMaster Pro

Use este checklist para garantir que tudo está configurado corretamente.

---

## 📦 PRÉ-DEPLOY

### Preparação Local
- [ ] Frontend rodando localmente (`npm run dev`)
- [ ] Backend rodando localmente (`cd backend && npm run dev`)
- [ ] Banco de dados local funcionando
- [ ] Testado login e funcionalidades principais

### GitHub
- [ ] Repositório criado no GitHub
- [ ] Código commitado e enviado
- [ ] `.gitignore` configurado corretamente
- [ ] Sem arquivos `.env` no repositório

---

## 🗄️ BANCO DE DADOS

### Neon.tech
- [ ] Conta criada em https://neon.tech
- [ ] Projeto criado
- [ ] Connection string copiada
- [ ] Connection string salva em local seguro

**Connection String:**
```
postgresql://user:pass@host.neon.tech/dbname?sslmode=require
```

---

## 🔧 BACKEND (Railway)

### Configuração Inicial
- [ ] Conta criada em https://railway.app
- [ ] Projeto criado e conectado ao GitHub
- [ ] Root Directory configurado como `backend`

### Variáveis de Ambiente
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `3001`
- [ ] `DATABASE_URL` = connection string do Neon
- [ ] `JWT_SECRET` = chave aleatória de 32+ caracteres
- [ ] `JWT_EXPIRES_IN` = `7d`
- [ ] `CORS_ORIGIN` = URL da Vercel (atualizar depois)
- [ ] `RATE_LIMIT_WINDOW_MS` = `900000`
- [ ] `RATE_LIMIT_MAX_REQUESTS` = `100`

### Build e Deploy
- [ ] Build concluído com sucesso
- [ ] Deploy concluído
- [ ] URL do backend copiada
- [ ] Health check funcionando: `/health`

### Database Setup
- [ ] Migrations executadas (`npx prisma migrate deploy`)
- [ ] Seed executado (`npx prisma db seed`)
- [ ] Dados iniciais criados (usuários admin e operator)

**URL do Backend:**
```
https://__________________.railway.app
```

---

## 🌐 FRONTEND (Vercel)

### Configuração Inicial
- [ ] Conta criada em https://vercel.com
- [ ] Projeto importado do GitHub
- [ ] Framework detectado como Vite

### Build Settings
- [ ] Framework Preset: `Vite`
- [ ] Root Directory: `./` (raiz)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

### Variáveis de Ambiente
- [ ] `VITE_API_URL` = URL do backend + `/api`

Exemplo:
```
VITE_API_URL=https://seu-backend.railway.app/api
```

### Deploy
- [ ] Build concluído com sucesso
- [ ] Deploy concluído
- [ ] URL da Vercel copiada
- [ ] Site acessível no navegador

**URL do Frontend:**
```
https://__________________.vercel.app
```

---

## 🔄 CONFIGURAÇÃO FINAL

### Atualizar CORS
- [ ] Voltou no Railway
- [ ] Atualizou `CORS_ORIGIN` com URL da Vercel
- [ ] Railway fez redeploy automático
- [ ] Aguardou 1-2 minutos

### Verificar Conexão
- [ ] Frontend carrega sem erros
- [ ] Console do navegador sem erros de CORS
- [ ] API respondendo corretamente

---

## 🧪 TESTES DE PRODUÇÃO

### Acesso Básico
- [ ] Site abre no navegador
- [ ] Página de login aparece
- [ ] Sem erros no console

### Autenticação
- [ ] Login com `admin@stockmaster.com` / `admin123` funciona
- [ ] Token JWT é gerado
- [ ] Redirecionamento para dashboard

### Dashboard
- [ ] Dashboard carrega
- [ ] Métricas aparecem
- [ ] Gráficos renderizam
- [ ] Cards com dados corretos

### Produtos
- [ ] Lista de produtos carrega
- [ ] Consegue criar novo produto
- [ ] Consegue editar produto
- [ ] Consegue deletar produto
- [ ] Exportar CSV funciona

### Estoque
- [ ] Lista de movimentações carrega
- [ ] Consegue criar entrada
- [ ] Consegue criar saída
- [ ] Estoque atualiza corretamente

### Clientes
- [ ] Lista de clientes carrega
- [ ] Consegue criar cliente
- [ ] Consegue editar cliente
- [ ] Filtros funcionam

### Fornecedores
- [ ] Lista de fornecedores carrega
- [ ] Consegue criar fornecedor
- [ ] Consegue editar fornecedor

### Relatórios
- [ ] Relatórios carregam
- [ ] Dados aparecem corretamente
- [ ] Gráficos funcionam

### Configurações
- [ ] Branding carrega
- [ ] Consegue alterar nome da empresa
- [ ] Consegue alterar cor primária
- [ ] Mudanças refletem na interface

### Usuários (Admin)
- [ ] Lista de usuários carrega
- [ ] Consegue criar novo usuário
- [ ] Consegue editar usuário
- [ ] Consegue deletar usuário

### Auditoria (Admin)
- [ ] Logs de auditoria carregam
- [ ] Ações são registradas
- [ ] Filtros funcionam

---

## 🔒 SEGURANÇA

### Pós-Deploy
- [ ] Alterou senha do admin padrão
- [ ] JWT_SECRET é único e aleatório
- [ ] CORS configurado apenas para domínio da Vercel
- [ ] Variáveis de ambiente não estão no código
- [ ] `.env` está no `.gitignore`

### Monitoramento
- [ ] Configurou alertas no Railway (opcional)
- [ ] Configurou alertas na Vercel (opcional)
- [ ] Salvou credenciais de acesso em local seguro

---

## 📊 PERFORMANCE

### Otimizações
- [ ] Build do frontend otimizado
- [ ] Assets comprimidos
- [ ] Imagens otimizadas (se houver)
- [ ] Lazy loading configurado (se aplicável)

### Testes de Velocidade
- [ ] Tempo de carregamento < 3 segundos
- [ ] Lighthouse score > 80
- [ ] Sem warnings no console

---

## 📱 DOMÍNIO CUSTOMIZADO (Opcional)

### Vercel
- [ ] Domínio comprado
- [ ] DNS configurado
- [ ] Domínio adicionado na Vercel
- [ ] SSL/HTTPS funcionando

### Railway
- [ ] Domínio customizado configurado (opcional)
- [ ] SSL/HTTPS funcionando

---

## 🎉 DEPLOY CONCLUÍDO

### Informações Finais

**URLs de Produção:**
- Frontend: `https://__________________.vercel.app`
- Backend: `https://__________________.railway.app`
- API: `https://__________________.railway.app/api`

**Credenciais Padrão:**
- Email: `admin@stockmaster.com`
- Senha: `admin123` (ALTERAR IMEDIATAMENTE!)

**Custos:**
- Vercel: R$ 0,00/mês
- Railway: R$ 0,00/mês (até $5 de uso)
- Neon: R$ 0,00/mês (até 3GB)

**Total: GRÁTIS! 🎉**

---

## 📞 PRÓXIMOS PASSOS

1. [ ] Alterar senha do administrador
2. [ ] Criar usuários para sua equipe
3. [ ] Configurar branding (nome, logo, cores)
4. [ ] Importar produtos reais
5. [ ] Treinar equipe no sistema
6. [ ] Configurar backup automático (opcional)
7. [ ] Configurar domínio customizado (opcional)
8. [ ] Configurar analytics (opcional)

---

## 🆘 SUPORTE

**Problemas Comuns:**

| Problema | Solução |
|----------|---------|
| CORS Error | Verificar CORS_ORIGIN no Railway |
| 500 Error | Verificar logs no Railway |
| Build Failed | Verificar variáveis de ambiente |
| Database Error | Verificar DATABASE_URL |
| Login não funciona | Verificar se seed foi executado |

**Logs:**
- Railway: Dashboard → Deployments → View Logs
- Vercel: Dashboard → Deployments → View Function Logs
- Browser: F12 → Console

---

**Data do Deploy:** ___/___/______

**Responsável:** _________________

**Status:** [ ] Em Progresso  [ ] Concluído  [ ] Com Problemas

---

✅ **Parabéns! Seu StockMaster Pro está no ar!** 🚀
