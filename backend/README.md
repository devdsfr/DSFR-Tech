# 🚀 StockMaster Pro - Backend API

Backend RESTful API para o sistema StockMaster Pro SaaS White-Label de Gestão de Estoque.

## 📋 Stack Tecnológica

- **Runtime:** Node.js 18+
- **Linguagem:** TypeScript
- **Framework:** Express.js
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** JWT (JSON Web Tokens)
- **Segurança:** Helmet, CORS, Rate Limiting, bcrypt
- **2FA:** Speakeasy + QRCode

---

## 🛠️ Instalação e Configuração

### 1. Pré-requisitos

- Node.js 18 ou superior
- PostgreSQL 14 ou superior
- npm ou yarn

### 2. Instalar Dependências

```bash
cd backend
npm install
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
NODE_ENV=development
PORT=3001

# PostgreSQL Connection String
DATABASE_URL="postgresql://usuario:senha@localhost:5432/stockmaster?schema=public"

# JWT Configuration
JWT_SECRET=sua-chave-secreta-super-segura-aqui
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Configurar Banco de Dados

```bash
# Gerar Prisma Client
npm run prisma:generate

# Executar Migrations
npm run prisma:migrate

# Popular banco com dados iniciais (seed)
npm run prisma:seed
```

### 5. Iniciar Servidor

```bash
# Modo Desenvolvimento (com hot-reload)
npm run dev

# Modo Produção
npm run build
npm start
```

O servidor estará disponível em: `http://localhost:3001`

---

## 🔐 Usuários Padrão (Seed)

Após executar o seed, os seguintes usuários estarão disponíveis:

| Email | Senha | Papel |
|-------|-------|-------|
| admin@stockmaster.com | admin123 | ADMIN |
| operator@stockmaster.com | admin123 | OPERATOR |

---

## 📡 Endpoints da API

### Autenticação (`/api/auth`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/login` | Login de usuário | ❌ |
| POST | `/register` | Registro de novo usuário | ❌ |
| GET | `/verify` | Verificar token JWT | ✅ |
| POST | `/2fa/enable` | Habilitar 2FA | ✅ |
| POST | `/2fa/verify` | Verificar código 2FA | ✅ |
| POST | `/2fa/disable` | Desabilitar 2FA | ✅ |

### Produtos (`/api/products`)

| Método | Endpoint | Descrição | Auth | Permissão |
|--------|----------|-----------|------|-----------|
| GET | `/` | Listar produtos | ✅ | Todos |
| GET | `/:id` | Buscar produto por ID | ✅ | Todos |
| GET | `/export` | Exportar produtos (CSV) | ✅ | Todos |
| POST | `/` | Criar produto | ✅ | ADMIN, OPERATOR |
| PUT | `/:id` | Atualizar produto | ✅ | ADMIN, OPERATOR |
| DELETE | `/:id` | Deletar produto | ✅ | ADMIN |

### Movimentações de Estoque (`/api/stock`)

| Método | Endpoint | Descrição | Auth | Permissão |
|--------|----------|-----------|------|-----------|
| GET | `/` | Listar movimentações | ✅ | Todos |
| GET | `/:id` | Buscar movimentação por ID | ✅ | Todos |
| GET | `/product/:productId` | Movimentações por produto | ✅ | Todos |
| POST | `/` | Criar movimentação | ✅ | ADMIN, OPERATOR |

### Clientes (`/api/customers`)

| Método | Endpoint | Descrição | Auth | Permissão |
|--------|----------|-----------|------|-----------|
| GET | `/` | Listar clientes | ✅ | Todos |
| GET | `/:id` | Buscar cliente por ID | ✅ | Todos |
| POST | `/` | Criar cliente | ✅ | ADMIN, OPERATOR |
| PUT | `/:id` | Atualizar cliente | ✅ | ADMIN, OPERATOR |
| DELETE | `/:id` | Deletar cliente | ✅ | ADMIN |

### Fornecedores (`/api/suppliers`)

| Método | Endpoint | Descrição | Auth | Permissão |
|--------|----------|-----------|------|-----------|
| GET | `/` | Listar fornecedores | ✅ | Todos |
| GET | `/:id` | Buscar fornecedor por ID | ✅ | Todos |
| POST | `/` | Criar fornecedor | ✅ | ADMIN, OPERATOR |
| PUT | `/:id` | Atualizar fornecedor | ✅ | ADMIN, OPERATOR |
| DELETE | `/:id` | Deletar fornecedor | ✅ | ADMIN |

### Relatórios (`/api/reports`)

| Método | Endpoint | Descrição | Auth | Permissão |
|--------|----------|-----------|------|-----------|
| GET | `/dashboard` | Métricas do dashboard | ✅ | Todos |
| GET | `/stock` | Relatório de estoque | ✅ | Todos |
| GET | `/financial` | Relatório financeiro | ✅ | ADMIN |
| GET | `/movements` | Relatório de movimentações | ✅ | Todos |

### Configurações (`/api/settings`)

| Método | Endpoint | Descrição | Auth | Permissão |
|--------|----------|-----------|------|-----------|
| GET | `/branding` | Obter branding | ✅ | Todos |
| PUT | `/branding` | Atualizar branding | ✅ | ADMIN |

### Usuários (`/api/users`)

| Método | Endpoint | Descrição | Auth | Permissão |
|--------|----------|-----------|------|-----------|
| GET | `/` | Listar usuários | ✅ | ADMIN |
| GET | `/:id` | Buscar usuário por ID | ✅ | ADMIN |
| POST | `/` | Criar usuário | ✅ | ADMIN |
| PUT | `/:id` | Atualizar usuário | ✅ | ADMIN |
| DELETE | `/:id` | Deletar usuário | ✅ | ADMIN |

### Auditoria (`/api/audit`)

| Método | Endpoint | Descrição | Auth | Permissão |
|--------|----------|-----------|------|-----------|
| GET | `/` | Listar logs de auditoria | ✅ | ADMIN |

---

## 🔒 Segurança

### Autenticação JWT

Todas as rotas protegidas requerem um token JWT no header:

```
Authorization: Bearer <seu-token-jwt>
```

### Níveis de Permissão

- **ADMIN:** Acesso total ao sistema
- **OPERATOR:** Acesso a produtos, estoque, clientes e fornecedores
- **READER:** Acesso apenas de leitura

### Rate Limiting

- Limite padrão: 100 requisições por 15 minutos por IP
- Configurável via variáveis de ambiente

### 2FA (Two-Factor Authentication)

Sistema de autenticação de dois fatores usando TOTP (Time-based One-Time Password).

---

## 📊 Modelo de Dados

### User
- id, email, password, name, role
- twoFactorSecret, twoFactorEnabled
- timestamps

### Product
- id, name, sku, category, supplier
- costPrice, salePrice, stock, minStock
- timestamps

### StockMovement
- id, productId, type (ENTRY/EXIT/ADJUSTMENT)
- quantity, notes, userId
- timestamp

### Customer
- id, name, email, phone, status
- lastPurchase, timestamps

### Supplier
- id, name, contact, email, category
- timestamps

### Branding
- id, companyName, logo, primaryColor
- timestamps

### AuditLog
- id, userId, action, resource
- ipAddress, userAgent, timestamp

---

## 🧪 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Prisma Studio (GUI para banco)
npm run prisma:studio

# Criar nova migration
npm run prisma:migrate

# Resetar banco de dados
npx prisma migrate reset
```

---

## 🌐 Health Check

Endpoint para verificar status do servidor:

```
GET http://localhost:3001/health
```

Resposta:
```json
{
  "status": "ok",
  "timestamp": "2024-02-07T15:30:00.000Z"
}
```

---

## 📝 Logs de Auditoria

O sistema registra automaticamente todas as ações sensíveis:
- Criação, atualização e exclusão de recursos
- IP e User-Agent do requisitante
- Usuário responsável pela ação
- Timestamp da operação

---

## 🚀 Deploy em Produção

### Variáveis de Ambiente Recomendadas

```env
NODE_ENV=production
PORT=3001
DATABASE_URL="postgresql://..."
JWT_SECRET="chave-super-segura-gerada-aleatoriamente"
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://seu-dominio.com
```

### Checklist de Segurança

- ✅ Alterar `JWT_SECRET` para valor aleatório e seguro
- ✅ Configurar CORS apenas para domínios confiáveis
- ✅ Usar HTTPS em produção
- ✅ Configurar backup automático do banco
- ✅ Habilitar logs de aplicação
- ✅ Configurar rate limiting adequado
- ✅ Usar variáveis de ambiente seguras

---

## 📧 Suporte

Para dúvidas ou problemas, consulte a documentação ou entre em contato com o time de desenvolvimento.

---

*Documentação gerada para StockMaster Pro Backend API v1.0.0*
