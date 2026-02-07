# 📡 Exemplos de Uso da API - StockMaster Backend

Este documento contém exemplos práticos de como usar cada endpoint da API.

## 🔐 Autenticação

### 1. Login

```http
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "admin@stockmaster.com",
  "password": "admin123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "admin@stockmaster.com",
    "name": "Administrator",
    "role": "ADMIN"
  }
}
```

### 2. Login com 2FA

```http
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "admin@stockmaster.com",
  "password": "admin123",
  "twoFactorCode": "123456"
}
```

### 3. Registrar Novo Usuário

```http
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "email": "novo@example.com",
  "password": "senha123",
  "name": "Novo Usuário",
  "role": "OPERATOR"
}
```

### 4. Verificar Token

```http
GET http://localhost:3001/api/auth/verify
Authorization: Bearer SEU_TOKEN_AQUI
```

### 5. Habilitar 2FA

```http
POST http://localhost:3001/api/auth/2fa/enable
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta:**
```json
{
  "secret": "JBSWY3DPEHPK3PXP",
  "qrCode": "data:image/png;base64,..."
}
```

### 6. Verificar Código 2FA

```http
POST http://localhost:3001/api/auth/2fa/verify
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "code": "123456"
}
```

---

## 📦 Produtos

### 1. Listar Todos os Produtos

```http
GET http://localhost:3001/api/products
Authorization: Bearer SEU_TOKEN_AQUI
```

### 2. Buscar Produtos (com filtros)

```http
GET http://localhost:3001/api/products?search=notebook&category=Eletrônicos
Authorization: Bearer SEU_TOKEN_AQUI
```

### 3. Buscar Produto por ID

```http
GET http://localhost:3001/api/products/uuid-do-produto
Authorization: Bearer SEU_TOKEN_AQUI
```

### 4. Criar Produto

```http
POST http://localhost:3001/api/products
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "name": "Mouse Gamer RGB",
  "sku": "PROD-004",
  "category": "Periféricos",
  "supplier": "Razer",
  "costPrice": 150.00,
  "salePrice": 250.00,
  "stock": 20,
  "minStock": 5
}
```

### 5. Atualizar Produto

```http
PUT http://localhost:3001/api/products/uuid-do-produto
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "name": "Mouse Gamer RGB Pro",
  "salePrice": 280.00,
  "minStock": 8
}
```

### 6. Deletar Produto

```http
DELETE http://localhost:3001/api/products/uuid-do-produto
Authorization: Bearer SEU_TOKEN_AQUI
```

### 7. Exportar Produtos (CSV)

```http
GET http://localhost:3001/api/products/export
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 📊 Movimentações de Estoque

### 1. Listar Movimentações

```http
GET http://localhost:3001/api/stock
Authorization: Bearer SEU_TOKEN_AQUI
```

### 2. Filtrar Movimentações

```http
GET http://localhost:3001/api/stock?type=ENTRY&startDate=2024-01-01&limit=20
Authorization: Bearer SEU_TOKEN_AQUI
```

### 3. Criar Entrada de Estoque

```http
POST http://localhost:3001/api/stock
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "productId": "uuid-do-produto",
  "type": "ENTRY",
  "quantity": 50,
  "notes": "Compra de fornecedor"
}
```

### 4. Criar Saída de Estoque

```http
POST http://localhost:3001/api/stock
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "productId": "uuid-do-produto",
  "type": "EXIT",
  "quantity": 10,
  "notes": "Venda para cliente"
}
```

### 5. Ajuste de Estoque

```http
POST http://localhost:3001/api/stock
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "productId": "uuid-do-produto",
  "type": "ADJUSTMENT",
  "quantity": 100,
  "notes": "Inventário físico"
}
```

### 6. Movimentações de um Produto

```http
GET http://localhost:3001/api/stock/product/uuid-do-produto
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 👥 Clientes

### 1. Listar Clientes

```http
GET http://localhost:3001/api/customers
Authorization: Bearer SEU_TOKEN_AQUI
```

### 2. Buscar Clientes

```http
GET http://localhost:3001/api/customers?search=João&status=ACTIVE
Authorization: Bearer SEU_TOKEN_AQUI
```

### 3. Criar Cliente

```http
POST http://localhost:3001/api/customers
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "name": "Carlos Mendes",
  "email": "carlos@example.com",
  "phone": "(11) 99999-8888",
  "status": "ACTIVE",
  "lastPurchase": "2024-02-01"
}
```

### 4. Atualizar Cliente

```http
PUT http://localhost:3001/api/customers/uuid-do-cliente
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "phone": "(11) 98888-7777",
  "status": "INACTIVE"
}
```

### 5. Deletar Cliente

```http
DELETE http://localhost:3001/api/customers/uuid-do-cliente
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 🏭 Fornecedores

### 1. Listar Fornecedores

```http
GET http://localhost:3001/api/suppliers
Authorization: Bearer SEU_TOKEN_AQUI
```

### 2. Criar Fornecedor

```http
POST http://localhost:3001/api/suppliers
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "name": "Tech Supplies LTDA",
  "contact": "(11) 3000-0000",
  "email": "contato@techsupplies.com",
  "category": "Eletrônicos"
}
```

### 3. Atualizar Fornecedor

```http
PUT http://localhost:3001/api/suppliers/uuid-do-fornecedor
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "contact": "(11) 3100-0000",
  "category": "Tecnologia"
}
```

---

## 📈 Relatórios

### 1. Métricas do Dashboard

```http
GET http://localhost:3001/api/reports/dashboard
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta:**
```json
{
  "totalProducts": 150,
  "totalStockValue": 125000.50,
  "totalExits": 450,
  "criticalAlerts": 12,
  "lowStockCount": 8,
  "outOfStockCount": 4,
  "movementsByType": [...],
  "categoryDistribution": [...]
}
```

### 2. Relatório de Estoque

```http
GET http://localhost:3001/api/reports/stock
Authorization: Bearer SEU_TOKEN_AQUI
```

### 3. Relatório Financeiro (Admin)

```http
GET http://localhost:3001/api/reports/financial?startDate=2024-01-01&endDate=2024-02-07
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta:**
```json
{
  "totalRevenue": 85000.00,
  "totalCost": 52000.00,
  "profit": 33000.00,
  "profitMargin": 38.82,
  "currentStockValue": 125000.50,
  "totalMovements": 320
}
```

### 4. Relatório de Movimentações

```http
GET http://localhost:3001/api/reports/movements?type=EXIT&startDate=2024-01-01
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## ⚙️ Configurações

### 1. Obter Branding

```http
GET http://localhost:3001/api/settings/branding
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta:**
```json
{
  "id": "uuid",
  "companyName": "StockMaster Pro",
  "logo": "📦",
  "primaryColor": "#3b82f6",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-02-07T15:30:00.000Z"
}
```

### 2. Atualizar Branding (Admin)

```http
PUT http://localhost:3001/api/settings/branding
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "companyName": "Minha Empresa LTDA",
  "logo": "🏢",
  "primaryColor": "#10b981"
}
```

---

## 👤 Gestão de Usuários (Admin)

### 1. Listar Usuários

```http
GET http://localhost:3001/api/users
Authorization: Bearer SEU_TOKEN_AQUI
```

### 2. Criar Usuário

```http
POST http://localhost:3001/api/users
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "email": "operador@example.com",
  "password": "senha123",
  "name": "Operador Silva",
  "role": "OPERATOR"
}
```

### 3. Atualizar Usuário

```http
PUT http://localhost:3001/api/users/uuid-do-usuario
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "name": "Operador Silva Junior",
  "role": "ADMIN"
}
```

### 4. Deletar Usuário

```http
DELETE http://localhost:3001/api/users/uuid-do-usuario
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 📋 Logs de Auditoria (Admin)

### 1. Listar Logs

```http
GET http://localhost:3001/api/audit
Authorization: Bearer SEU_TOKEN_AQUI
```

### 2. Filtrar Logs

```http
GET http://localhost:3001/api/audit?action=CREATE&resource=PRODUCT&limit=50
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta:**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "action": "CREATE",
    "resource": "PRODUCT",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0...",
    "createdAt": "2024-02-07T15:30:00.000Z",
    "user": {
      "name": "Administrator",
      "email": "admin@stockmaster.com"
    }
  }
]
```

---

## 🔍 Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Requisição inválida |
| 401 | Não autenticado |
| 403 | Sem permissão |
| 404 | Não encontrado |
| 500 | Erro interno do servidor |

---

## 💡 Dicas

1. **Sempre inclua o token JWT** no header `Authorization: Bearer TOKEN`
2. **Use Content-Type: application/json** para requisições POST/PUT
3. **Teste primeiro com Postman ou Insomnia** antes de integrar no frontend
4. **Verifique os logs do servidor** em caso de erro
5. **Use filtros e paginação** para otimizar consultas grandes

---

**Documentação completa disponível em `README.md`**
