import { Router } from 'express';
import {
  getDashboardMetrics,
  getStockReport,
  getFinancialReport,
  getMovementReport,
} from '../controllers/report.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/dashboard', getDashboardMetrics);
router.get('/stock', getStockReport);
router.get('/financial', authorize('ADMIN'), getFinancialReport);
router.get('/movements', getMovementReport);

export default router;
