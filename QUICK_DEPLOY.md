# ⚡ Deploy Rápido - 30 Minutos

## 🎯 Roteiro Express para Colocar no Ar AGORA

### ⏱️ ETAPA 1: Banco de Dados (5 min)

1. Abra: https://neon.tech
2. "Sign Up" com GitHub
3. "Create Project" → Nome: `stockmaster`
4. **COPIE** a connection string que aparece
5. ✅ PRONTO!

---

### ⏱️ ETAPA 2: Subir para GitHub (5 min)

```bash
# Na pasta do projeto
git init
git add .
git commit -m "Deploy StockMaster Pro"

# No GitHub: https://github.com/new
# Criar repo: stockmaster-white-label-saas

# Voltar ao terminal (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/stockmaster-white-label-saas.git
git branch -M main
git push -u origin main
```

✅ Código no GitHub!

---

### ⏱️ ETAPA 3: Backend no Railway (10 min)

1. Abra: https://railway.app
2. "Start a New Project" → Login com GitHub
3. "Deploy from GitHub repo" → Selecione `stockmaster-white-label-saas`
4. Clique no serviço criado → "Variables"
5. Adicione estas variáveis:

```
NODE_ENV=production
PORT=3001
DATABASE_URL=cole-aqui-a-connection-string-do-neon
JWT_SECRET=sua-chave-super-secreta-minimo-32-caracteres-aleatoria
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

6. "Settings" → "Root Directory" → Digite: `backend`
7. "Deploy" → Aguarde 3 minutos
8. **COPIE** a URL gerada (ex: `https://stockmaster-production.up.railway.app`)

9. **Executar Migrations:**
   - Ainda no Railway, vá em "Settings"
   - Em "Custom Start Command" adicione:
   ```
   npx prisma migrate deploy && npx prisma db seed && npm start
   ```
   - Salve e aguarde redeploy

✅ Backend no ar!

---

### ⏱️ ETAPA 4: Frontend na Vercel (10 min)

1. Abra: https://vercel.com/new
2. "Import Git Repository"
3. Selecione `stockmaster-white-label-saas`
4. Configure:
   - Framework Preset: `Vite`
   - Root Directory: `./` (deixe vazio ou ponto)
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Environment Variables:**
   ```
   VITE_API_URL=https://sua-url-do-railway.railway.app/api
   ```
   (Cole a URL do Railway que você copiou, adicione `/api` no final)

6. "Deploy" → Aguarde 2 minutos
7. **COPIE** a URL da Vercel (ex: `https://stockmaster.vercel.app`)

8. **Atualizar CORS:**
   - Volte no Railway
   - Edite a variável `CORS_ORIGIN`
   - Troque `*` pela URL da Vercel (sem barra no final)
   - Exemplo: `https://stockmaster.vercel.app`

✅ Frontend no ar!

---

## 🎉 PRONTO! TESTE AGORA

1. Acesse: `https://seu-projeto.vercel.app`
2. Login:
   - Email: `admin@stockmaster.com`
   - Senha: `admin123`

---

## 🐛 Deu Erro?

### Backend não sobe
- Verifique se "Root Directory" está como `backend` no Railway
- Verifique se DATABASE_URL está correto

### Frontend não conecta
- Verifique se VITE_API_URL tem `/api` no final
- Teste o backend: `https://sua-url.railway.app/health`

### CORS Error
- Atualize CORS_ORIGIN no Railway com a URL exata da Vercel

---

## 📱 URLs Finais

- **Site:** https://seu-projeto.vercel.app
- **API:** https://seu-backend.railway.app
- **Health:** https://seu-backend.railway.app/health

**TUDO GRÁTIS! 🎉**
