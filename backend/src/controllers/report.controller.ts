import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getDashboardMetrics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalProducts = await prisma.product.count();

    const products = await prisma.product.findMany({
      select: { stock: true, salePrice: true, minStock: true },
    });

    const totalStockValue = products.reduce((sum, p) => sum + (p.stock * p.salePrice), 0);
    const lowStockCount = products.filter(p => p.stock <= p.minStock && p.stock > 0).length;
    const outOfStockCount = products.filter(p => p.stock === 0).length;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentMovements = await prisma.stockMovement.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { type: true, quantity: true },
    });

    const totalExits = recentMovements
      .filter(m => m.type === 'EXIT')
      .reduce((sum, m) => sum + m.quantity, 0);

    const movementsByDate = await prisma.stockMovement.groupBy({
      by: ['type'],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _sum: { quantity: true },
    });

    const categoryDistribution = await prisma.product.groupBy({
      by: ['category'],
      _count: { id: true },
      _sum: { stock: true },
    });

    res.json({
      totalProducts,
      totalStockValue,
      totalExits,
      criticalAlerts: lowStockCount + outOfStockCount,
      lowStockCount,
      outOfStockCount,
      movementsByType: movementsByDate,
      categoryDistribution,
    });
  } catch (error) {
    console.error('Dashboard metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
};

export const getStockReport = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        sku: true,
        category: true,
        stock: true,
        minStock: true,
        salePrice: true,
      },
      orderBy: { stock: 'asc' },
    });

    const report = products.map(p => ({
      ...p,
      status: p.stock === 0 ? 'OUT_OF_STOCK' : p.stock <= p.minStock ? 'LOW_STOCK' : 'IN_STOCK',
      stockValue: p.stock * p.salePrice,
    }));

    res.json(report);
  } catch (error) {
    console.error('Stock report error:', error);
    res.status(500).json({ error: 'Failed to generate stock report' });
  }
};

export const getFinancialReport = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    const where: any = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate as string);
      if (endDate) where.createdAt.lte = new Date(endDate as string);
    }

    const movements = await prisma.stockMovement.findMany({
      where,
      include: {
        product: { select: { costPrice: true, salePrice: true } },
      },
    });

    let totalRevenue = 0;
    let totalCost = 0;

    movements.forEach(m => {
      if (m.type === 'EXIT') {
        totalRevenue += m.quantity * m.product.salePrice;
        totalCost += m.quantity * m.product.costPrice;
      } else if (m.type === 'ENTRY') {
        totalCost += m.quantity * m.product.costPrice;
      }
    });

    const profit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    const products = await prisma.product.findMany({
      select: { stock: true, salePrice: true, costPrice: true },
    });

    const currentStockValue = products.reduce((sum, p) => sum + (p.stock * p.costPrice), 0);

    res.json({
      totalRevenue,
      totalCost,
      profit,
      profitMargin,
      currentStockValue,
      totalMovements: movements.length,
    });
  } catch (error) {
    console.error('Financial report error:', error);
    res.status(500).json({ error: 'Failed to generate financial report' });
  }
};

export const getMovementReport = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, type } = req.query;

    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate as string);
      if (endDate) where.createdAt.lte = new Date(endDate as string);
    }

    if (type) {
      where.type = type;
    }

    const movements = await prisma.stockMovement.findMany({
      where,
      include: {
        product: { select: { name: true, sku: true, category: true } },
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const summary = await prisma.stockMovement.groupBy({
      by: ['type'],
      where,
      _sum: { quantity: true },
      _count: { id: true },
    });

    res.json({
      movements,
      summary,
      total: movements.length,
    });
  } catch (error) {
    console.error('Movement report error:', error);
    res.status(500).json({ error: 'Failed to generate movement report' });
  }
};
