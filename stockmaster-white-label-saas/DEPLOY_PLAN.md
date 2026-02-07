# 🚀 Plano de Deploy - StockMaster Pro
## Objetivo: Site no Ar HOJE

Este documento contém o passo a passo completo para colocar o StockMaster Pro em produção **hoje mesmo**.

---

## 📋 Visão Geral da Arquitetura

- **Frontend:** Vercel (React + Vite)
- **Backend:** Railway.app ou Render.com (Node.js + Express)
- **Banco de Dados:** Neon.tech ou Supabase (PostgreSQL)

**Tempo estimado:** 30-45 minutos

---

## 🎯 PARTE 1: Deploy do Banco de Dados (10 min)

### Opção A: Neon.tech (RECOMENDADO - Mais Rápido)

1. **Criar Conta**
   - Acesse: https://neon.tech
   - Clique em "Sign Up" (pode usar GitHub)
   - É GRÁTIS (sem cartão de crédito)

2. **Criar Projeto**
   - Clique em "Create Project"
   - Nome: `stockmaster-db`
   - Região: escolha a mais próxima (US East, Europe, etc.)
   - PostgreSQL version: 16
   - Clique em "Create Project"

3. **Copiar Connection String**
   - Na dashboard, você verá a connection string
   - Formato: `postgresql://user:password@host/database?sslmode=require`
   - **COPIE E GUARDE** - você vai precisar!

### Opção B: Supabase (Alternativa)

1. Acesse: https://supabase.com
2. "Start your project" → Login com GitHub
3. "New Project"
   - Nome: `stockmaster`
   - Database Password: crie uma senha forte
   - Region: escolha a mais próxima
4. Aguarde ~2 minutos para provisionar
5. Vá em "Settings" → "Database" → copie a "Connection string"

---

## 🎯 PARTE 2: Deploy do Backend (15 min)

### Opção A: Railway.app (RECOMENDADO)

#### 1. Preparar o Projeto

Primeiro, vamos criar um arquivo de configuração:

```bash
cd backend
```

Crie o arquivo `railway.json`:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### 2. Deploy no Railway

1. **Criar Conta**
   - Acesse: https://railway.app
   - "Start a New Project" → Login com GitHub
   - É GRÁTIS ($5 de crédito mensal)

2. **Criar Novo Projeto**
   - "New Project" → "Deploy from GitHub repo"
   - Autorize o Railway a acessar seus repositórios
   - Se ainda não tem no GitHub, veja seção "Subir para GitHub" abaixo

3. **Configurar Variáveis de Ambiente**
   - No projeto Railway, clique em "Variables"
   - Adicione as seguintes variáveis:

   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=sua-connection-string-do-neon-aqui
   JWT_SECRET=gere-uma-chave-super-segura-aqui-min-32-caracteres
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=https://seu-dominio-vercel.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

   **IMPORTANTE:** 
   - Para `JWT_SECRET`, use um gerador: https://randomkeygen.com/ (escolha "CodeIgniter Encryption Keys")
   - Para `CORS_ORIGIN`, você vai pegar depois do deploy do frontend

4. **Deploy**
   - Railway vai fazer o build automaticamente
   - Aguarde 2-3 minutos
   - Copie a URL gerada (ex: `https://seu-app.railway.app`)

5. **Executar Migrations**
   - No Railway, vá em "Settings" → "Deploy"
   - Em "Custom Start Command", adicione temporariamente:
   ```
   npx prisma migrate deploy && npm start
   ```
   - Depois do primeiro deploy, volte para `npm start`

### Opção B: Render.com (Alternativa)

1. Acesse: https://render.com
2. "Get Started" → Login com GitHub
3. "New +" → "Web Service"
4. Conecte seu repositório
5. Configure:
   - Name: `stockmaster-backend`
   - Environment: `Node`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npx prisma migrate deploy && npm start`
   - Instance Type: `Free`
6. Adicione as mesmas variáveis de ambiente do Railway
7. "Create Web Service"

---

## 🎯 PARTE 3: Deploy do Frontend na Vercel (10 min)

### 1. Preparar o Frontend

Primeiro, vamos criar um arquivo de configuração para a Vercel:

Crie `vercel.json` na raiz do projeto:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Deploy na Vercel

1. **Acessar Vercel**
   - Vá para: https://vercel.com/new
   - Login com GitHub (ou criar conta)

2. **Importar Projeto**
   - "Add New..." → "Project"
   - "Import Git Repository"
   - Selecione seu repositório do StockMaster
   - Se não estiver no GitHub ainda, veja seção abaixo

3. **Configurar Projeto**
   - Framework Preset: `Vite`
   - Root Directory: `./` (raiz do projeto, NÃO a pasta backend)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Variáveis de Ambiente**
   - Clique em "Environment Variables"
   - Adicione:
   ```
   VITE_API_URL=https://seu-backend.railway.app/api
   ```
   (Use a URL do Railway que você copiou antes)

5. **Deploy**
   - Clique em "Deploy"
   - Aguarde 2-3 minutos
   - Vercel vai gerar uma URL: `https://seu-projeto.vercel.app`

6. **Atualizar CORS no Backend**
   - Volte no Railway
   - Atualize a variável `CORS_ORIGIN` com a URL da Vercel
   - Formato: `https://seu-projeto.vercel.app` (sem barra no final)
   - Railway vai fazer redeploy automaticamente

---

## 📦 SUBIR PARA GITHUB (Se ainda não fez)

### 1. Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `stockmaster-white-label-saas`
3. Privado ou Público (sua escolha)
4. **NÃO** marque "Initialize with README"
5. "Create repository"

### 2. Subir o Código

No terminal, na pasta do projeto:

```bash
# Inicializar Git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit - StockMaster Pro"

# Adicionar remote (substitua SEU-USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU-USUARIO/stockmaster-white-label-saas.git

# Fazer push
git branch -M main
git push -u origin main
```

### 3. Criar .gitignore (se não existir)

Certifique-se de que existe um `.gitignore` na raiz com:

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
backend/node_modules/
backend/dist/
backend/.env
```

---

## 🔧 CONFIGURAÇÕES IMPORTANTES

### 1. Atualizar Frontend para Usar API Real

Se o frontend estiver usando dados mockados, você precisará criar um arquivo de configuração de API.

Crie `src/config/api.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  baseURL: API_URL,
  
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  },

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  },
};
```

### 2. Popular Banco de Dados em Produção

Após o deploy do backend, você precisa popular o banco:

**Opção A: Via Railway CLI**
```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Conectar ao projeto
railway link

# Executar seed
railway run npm run prisma:seed
```

**Opção B: Via Prisma Studio**
```bash
# Conectar ao banco de produção
DATABASE_URL="sua-connection-string" npx prisma studio
```

Depois adicione os dados manualmente ou execute o seed localmente apontando para o banco de produção.

---

## ✅ CHECKLIST FINAL

Antes de considerar o deploy completo, verifique:

### Banco de Dados
- [ ] PostgreSQL criado no Neon/Supabase
- [ ] Connection string copiada e salva
- [ ] Banco acessível e funcionando

### Backend
- [ ] Deploy no Railway/Render concluído
- [ ] Variáveis de ambiente configuradas
- [ ] Migrations executadas
- [ ] Seed executado (dados iniciais)
- [ ] URL do backend copiada
- [ ] Health check funcionando: `https://seu-backend.railway.app/health`

### Frontend
- [ ] Deploy na Vercel concluído
- [ ] Variável VITE_API_URL configurada
- [ ] Site acessível
- [ ] CORS configurado no backend com URL da Vercel

### Testes
- [ ] Consegue acessar o site
- [ ] Consegue fazer login (admin@stockmaster.com / admin123)
- [ ] Dashboard carrega dados
- [ ] Consegue criar um produto
- [ ] Consegue fazer movimentação de estoque

---

## 🐛 TROUBLESHOOTING

### Erro: "CORS policy"
**Solução:** Verifique se a variável `CORS_ORIGIN` no backend está com a URL correta da Vercel (sem barra no final).

### Erro: "Can't reach database"
**Solução:** Verifique se a `DATABASE_URL` está correta e se o banco está ativo no Neon/Supabase.

### Erro: "Prisma Client not generated"
**Solução:** No Railway, adicione ao build command: `npm install && npx prisma generate && npm run build`

### Frontend não conecta com Backend
**Solução:** 
1. Verifique se `VITE_API_URL` está configurada na Vercel
2. Teste o backend diretamente: `https://seu-backend.railway.app/health`
3. Verifique o console do navegador para erros

### Migrations não executam
**Solução:** Execute manualmente via Railway CLI:
```bash
railway run npx prisma migrate deploy
```

---

## 🎉 DEPLOY CONCLUÍDO!

Após seguir todos os passos, você terá:

- ✅ **Frontend:** `https://seu-projeto.vercel.app`
- ✅ **Backend:** `https://seu-backend.railway.app`
- ✅ **Banco:** PostgreSQL no Neon/Supabase
- ✅ **Sistema 100% funcional na nuvem**

### Credenciais de Acesso

- **Email:** admin@stockmaster.com
- **Senha:** admin123

**IMPORTANTE:** Altere a senha do admin após o primeiro login!

---

## 📊 CUSTOS MENSAIS

- **Vercel:** GRÁTIS (até 100GB bandwidth)
- **Railway:** GRÁTIS ($5 de crédito mensal - suficiente para projetos pequenos)
- **Neon:** GRÁTIS (até 3GB de dados)

**Total: R$ 0,00/mês** para começar! 🎉

---

## 🔄 ATUALIZAÇÕES FUTURAS

Sempre que fizer alterações no código:

### Frontend
1. Commit e push para GitHub
2. Vercel faz deploy automático

### Backend
1. Commit e push para GitHub
2. Railway faz deploy automático

### Migrations
```bash
railway run npx prisma migrate deploy
```

---

## 📞 SUPORTE

Se tiver problemas:
1. Verifique os logs no Railway/Vercel
2. Teste o backend diretamente via Postman
3. Verifique as variáveis de ambiente
4. Consulte a documentação em `backend/README.md`

---

**Boa sorte com o deploy! Seu StockMaster Pro estará no ar em menos de 1 hora! 🚀**
