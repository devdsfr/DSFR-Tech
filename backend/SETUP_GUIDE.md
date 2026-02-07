# 🚀 Guia de Configuração Rápida - StockMaster Backend

Este guia irá ajudá-lo a configurar o backend do StockMaster Pro em poucos minutos.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL 14+** - [Download](https://www.postgresql.org/download/)
- **Git** (opcional) - [Download](https://git-scm.com/)

## 🔧 Passo a Passo

### 1️⃣ Instalar PostgreSQL

#### Windows
1. Baixe o instalador do PostgreSQL
2. Durante a instalação, defina uma senha para o usuário `postgres`
3. Anote a porta (padrão: 5432)

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### macOS (com Homebrew)
```bash
brew install postgresql
brew services start postgresql
```

### 2️⃣ Criar Banco de Dados

Abra o terminal/prompt e execute:

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco de dados
CREATE DATABASE stockmaster;

# Sair
\q
```

### 3️⃣ Configurar Backend

```bash
# Navegar para a pasta backend
cd backend

# Instalar dependências
npm install
```

### 4️⃣ Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e ajuste a connection string do PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/stockmaster?schema=public"
```

**Importante:** Substitua `SUA_SENHA` pela senha que você definiu no PostgreSQL.

### 5️⃣ Configurar Banco de Dados

Execute os seguintes comandos na ordem:

```bash
# 1. Gerar Prisma Client
npm run prisma:generate

# 2. Criar tabelas no banco
npm run prisma:migrate

# 3. Popular com dados iniciais
npm run prisma:seed
```

### 6️⃣ Iniciar o Servidor

```bash
npm run dev
```

Você verá uma mensagem como:

```
🚀 StockMaster Backend running on port 3001
📊 Environment: development
🔗 Health check: http://localhost:3001/health
```

### 7️⃣ Testar a API

Abra seu navegador e acesse:

```
http://localhost:3001/health
```

Você deve ver:
```json
{
  "status": "ok",
  "timestamp": "2024-02-07T..."
}
```

## 🎉 Pronto!

Seu backend está funcionando! Agora você pode:

### Fazer Login

Use um dos usuários padrão:

**Administrador:**
- Email: `admin@stockmaster.com`
- Senha: `admin123`

**Operador:**
- Email: `operator@stockmaster.com`
- Senha: `admin123`

### Testar Endpoints

Use ferramentas como:
- **Postman** - [Download](https://www.postman.com/downloads/)
- **Insomnia** - [Download](https://insomnia.rest/download)
- **Thunder Client** (extensão VS Code)

Exemplo de requisição de login:

```bash
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "admin@stockmaster.com",
  "password": "admin123"
}
```

Resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@stockmaster.com",
    "name": "Administrator",
    "role": "ADMIN"
  }
}
```

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento (com hot-reload)
npm run dev

# Ver banco de dados (GUI)
npm run prisma:studio

# Resetar banco de dados
npx prisma migrate reset

# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 🐛 Problemas Comuns

### Erro: "Can't reach database server"

**Solução:** Verifique se o PostgreSQL está rodando:

```bash
# Windows
# Abra "Serviços" e procure por PostgreSQL

# Linux
sudo systemctl status postgresql

# macOS
brew services list
```

### Erro: "password authentication failed"

**Solução:** Verifique a senha no arquivo `.env`. A connection string deve estar correta:

```env
DATABASE_URL="postgresql://postgres:SENHA_CORRETA@localhost:5432/stockmaster?schema=public"
```

### Erro: "Port 3001 already in use"

**Solução:** Altere a porta no arquivo `.env`:

```env
PORT=3002
```

### Erro ao executar migrations

**Solução:** Resete o banco e tente novamente:

```bash
npx prisma migrate reset
npm run prisma:migrate
npm run prisma:seed
```

## 📚 Próximos Passos

1. Explore a API usando Postman ou Insomnia
2. Leia a documentação completa em `README.md`
3. Configure o frontend para conectar com o backend
4. Customize o sistema conforme suas necessidades

## 🔐 Segurança em Produção

Antes de fazer deploy em produção:

- ✅ Altere o `JWT_SECRET` para um valor aleatório e seguro
- ✅ Use senhas fortes para usuários
- ✅ Configure HTTPS
- ✅ Configure backups automáticos do banco
- ✅ Revise as configurações de CORS
- ✅ Configure rate limiting adequado

## 📞 Suporte

Se encontrar problemas, verifique:
1. Logs do servidor no terminal
2. Logs do PostgreSQL
3. Arquivo `.env` está configurado corretamente
4. Todas as dependências foram instaladas

---

**Boa sorte com seu projeto StockMaster Pro! 🚀**
