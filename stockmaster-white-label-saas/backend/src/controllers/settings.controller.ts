import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getBranding = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let branding = await prisma.branding.findFirst();

    if (!branding) {
      branding = await prisma.branding.create({
        data: {
          companyName: 'StockMaster Pro',
          logo: '📦',
          primaryColor: '#3b82f6',
        },
      });
    }

    res.json(branding);
  } catch (error) {
    console.error('Get branding error:', error);
    res.status(500).json({ error: 'Failed to fetch branding' });
  }
};

export const updateBranding = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { companyName, logo, primaryColor } = req.body;

    let branding = await prisma.branding.findFirst();

    if (!branding) {
      branding = await prisma.branding.create({
        data: {
          companyName: companyName || 'StockMaster Pro',
          logo: logo || '📦',
          primaryColor: primaryColor || '#3b82f6',
        },
      });
    } else {
      branding = await prisma.branding.update({
        where: { id: branding.id },
        data: {
          companyName,
          logo,
          primaryColor,
        },
      });
    }

    res.json(branding);
  } catch (error) {
    console.error('Update branding error:', error);
    res.status(500).json({ error: 'Failed to update branding' });
  }
};
