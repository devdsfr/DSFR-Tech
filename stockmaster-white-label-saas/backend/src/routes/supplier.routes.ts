import { Router } from 'express';
import {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplier.controller';
import { authenticate, authorize } from '../middleware/auth';
import { auditLogger } from '../middleware/auditLogger';

const router = Router();

router.use(authenticate);

router.get('/', getAllSuppliers);
router.get('/:id', getSupplierById);
router.post('/', authorize('ADMIN', 'OPERATOR'), auditLogger('CREATE', 'SUPPLIER'), createSupplier);
router.put('/:id', authorize('ADMIN', 'OPERATOR'), auditLogger('UPDATE', 'SUPPLIER'), updateSupplier);
router.delete('/:id', authorize('ADMIN'), auditLogger('DELETE', 'SUPPLIER'), deleteSupplier);

export default router;
