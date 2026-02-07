import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@stockmaster.com' },
    update: {},
    create: {
      email: 'admin@stockmaster.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'ADMIN',
    },
  });

  const operatorUser = await prisma.user.upsert({
    where: { email: 'operator@stockmaster.com' },
    update: {},
    create: {
      email: 'operator@stockmaster.com',
      password: hashedPassword,
      name: 'Operator User',
      role: 'OPERATOR',
    },
  });

  const branding = await prisma.branding.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      companyName: 'StockMaster Pro',
      logo: '📦',
      primaryColor: '#3b82f6',
    },
  });

  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: 'PROD-001' },
      update: {},
      create: {
        name: 'Notebook Dell Inspiron',
        sku: 'PROD-001',
        category: 'Eletrônicos',
        supplier: 'Dell Inc.',
        costPrice: 2500.00,
        salePrice: 3500.00,
        stock: 15,
        minStock: 5,
      },
    }),
    prisma.product.upsert({
      where: { sku: 'PROD-002' },
      update: {},
      create: {
        name: 'Mouse Logitech MX Master',
        sku: 'PROD-002',
        category: 'Periféricos',
        supplier: 'Logitech',
        costPrice: 250.00,
        salePrice: 450.00,
        stock: 30,
        minStock: 10,
      },
    }),
    prisma.product.upsert({
      where: { sku: 'PROD-003' },
      update: {},
      create: {
        name: 'Teclado Mecânico RGB',
        sku: 'PROD-003',
        category: 'Periféricos',
        supplier: 'Razer',
        costPrice: 350.00,
        salePrice: 550.00,
        stock: 3,
        minStock: 5,
      },
    }),
  ]);

  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { email: 'joao@example.com' },
      update: {},
      create: {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 98765-4321',
        status: 'ACTIVE',
        lastPurchase: new Date('2024-01-15'),
      },
    }),
    prisma.customer.upsert({
      where: { email: 'maria@example.com' },
      update: {},
      create: {
        name: 'Maria Santos',
        email: 'maria@example.com',
        phone: '(11) 91234-5678',
        status: 'ACTIVE',
        lastPurchase: new Date('2024-02-01'),
      },
    }),
  ]);

  const suppliers = await Promise.all([
    prisma.supplier.upsert({
      where: { email: 'contato@dell.com' },
      update: {},
      create: {
        name: 'Dell Inc.',
        contact: '(11) 3000-0000',
        email: 'contato@dell.com',
        category: 'Eletrônicos',
      },
    }),
    prisma.supplier.upsert({
      where: { email: 'vendas@logitech.com' },
      update: {},
      create: {
        name: 'Logitech',
        contact: '(11) 3100-0000',
        email: 'vendas@logitech.com',
        category: 'Periféricos',
      },
    }),
  ]);

  console.log('✅ Database seeded successfully!');
  console.log('👤 Admin User:', adminUser.email, '/ Password: admin123');
  console.log('👤 Operator User:', operatorUser.email, '/ Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
