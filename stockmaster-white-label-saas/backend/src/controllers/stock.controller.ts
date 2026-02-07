import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getAllMovements = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, type, startDate, endDate, limit = '50' } = req.query;

    const where: any = {};

    if (productId) {
      where.productId = productId;
    }

    if (type) {
      where.type = type;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate as string);
      if (endDate) where.createdAt.lte = new Date(endDate as string);
    }

    const movements = await prisma.stockMovement.findMany({
      where,
      include: {
        product: { select: { name: true, sku: true } },
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
    });

    res.json(movements);
  } catch (error) {
    console.error('Get movements error:', error);
    res.status(500).json({ error: 'Failed to fetch movements' });
  }
};

export const getMovementById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const movement = await prisma.stockMovement.findUnique({
      where: { id },
      include: {
        product: true,
        user: { select: { name: true, email: true } },
      },
    });

    if (!movement) {
      res.status(404).json({ error: 'Movement not found' });
      return;
    }

    res.json(movement);
  } catch (error) {
    console.error('Get movement error:', error);
    res.status(500).json({ error: 'Failed to fetch movement' });
  }
};

export const getMovementsByProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    const movements = await prisma.stockMovement.findMany({
      where: { productId },
      include: {
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(movements);
  } catch (error) {
    console.error('Get product movements error:', error);
    res.status(500).json({ error: 'Failed to fetch product movements' });
  }
};

export const createMovement = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, type, quantity, notes } = req.body;

    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    let newStock = product.stock;

    if (type === 'ENTRY') {
      newStock += parseInt(quantity);
    } else if (type === 'EXIT') {
      newStock -= parseInt(quantity);
      if (newStock < 0) {
        res.status(400).json({ error: 'Insufficient stock' });
        return;
      }
    } else if (type === 'ADJUSTMENT') {
      newStock = parseInt(quantity);
    }

    const [movement] = await prisma.$transaction([
      prisma.stockMovement.create({
        data: {
          productId,
          type,
          quantity: parseInt(quantity),
          notes,
          userId: req.user!.id,
        },
        include: {
          product: { select: { name: true, sku: true } },
          user: { select: { name: true } },
        },
      }),
      prisma.product.update({
        where: { id: productId },
        data: { stock: newStock },
      }),
    ]);

    res.status(201).json(movement);
  } catch (error) {
    console.error('Create movement error:', error);
    res.status(500).json({ error: 'Failed to create movement' });
  }
};
