import { Router } from 'express';
import {
  getAllMovements,
  getMovementById,
  createMovement,
  getMovementsByProduct,
} from '../controllers/stock.controller';
import { authenticate, authorize } from '../middleware/auth';
import { auditLogger } from '../middleware/auditLogger';

const router = Router();

router.use(authenticate);

router.get('/', getAllMovements);
router.get('/:id', getMovementById);
router.get('/product/:productId', getMovementsByProduct);
router.post('/', authorize('ADMIN', 'OPERATOR'), auditLogger('CREATE', 'STOCK_MOVEMENT'), createMovement);

export default router;
