import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getAllProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, category, status } = req.query;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { sku: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (status === 'low') {
      where.stock = { lte: prisma.product.fields.minStock };
    } else if (status === 'out') {
      where.stock = 0;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        movements: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: { user: { select: { name: true } } },
        },
      },
    });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, sku, category, supplier, costPrice, salePrice, stock, minStock } = req.body;

    const existingProduct = await prisma.product.findUnique({ where: { sku } });

    if (existingProduct) {
      res.status(400).json({ error: 'Product with this SKU already exists' });
      return;
    }

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        category,
        supplier,
        costPrice: parseFloat(costPrice),
        salePrice: parseFloat(salePrice),
        stock: parseInt(stock) || 0,
        minStock: parseInt(minStock) || 0,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, sku, category, supplier, costPrice, salePrice, minStock } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        sku,
        category,
        supplier,
        costPrice: costPrice ? parseFloat(costPrice) : undefined,
        salePrice: salePrice ? parseFloat(salePrice) : undefined,
        minStock: minStock ? parseInt(minStock) : undefined,
      },
    });

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.product.delete({ where: { id } });

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

export const exportProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const csv = [
      'ID,Name,SKU,Category,Supplier,Cost Price,Sale Price,Stock,Min Stock',
      ...products.map(p =>
        `${p.id},${p.name},${p.sku},${p.category},${p.supplier},${p.costPrice},${p.salePrice},${p.stock},${p.minStock}`
      ),
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export products error:', error);
    res.status(500).json({ error: 'Failed to export products' });
  }
};
