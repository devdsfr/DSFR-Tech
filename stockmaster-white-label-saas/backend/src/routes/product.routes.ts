import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  exportProducts,
} from '../controllers/product.controller';
import { authenticate, authorize } from '../middleware/auth';
import { auditLogger } from '../middleware/auditLogger';

const router = Router();

router.use(authenticate);

router.get('/', getAllProducts);
router.get('/export', exportProducts);
router.get('/:id', getProductById);
router.post('/', authorize('ADMIN', 'OPERATOR'), auditLogger('CREATE', 'PRODUCT'), createProduct);
router.put('/:id', authorize('ADMIN', 'OPERATOR'), auditLogger('UPDATE', 'PRODUCT'), updateProduct);
router.delete('/:id', authorize('ADMIN'), auditLogger('DELETE', 'PRODUCT'), deleteProduct);

export default router;
