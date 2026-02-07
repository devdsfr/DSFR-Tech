import { Router } from 'express';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customer.controller';
import { authenticate, authorize } from '../middleware/auth';
import { auditLogger } from '../middleware/auditLogger';

const router = Router();

router.use(authenticate);

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.post('/', authorize('ADMIN', 'OPERATOR'), auditLogger('CREATE', 'CUSTOMER'), createCustomer);
router.put('/:id', authorize('ADMIN', 'OPERATOR'), auditLogger('UPDATE', 'CUSTOMER'), updateCustomer);
router.delete('/:id', authorize('ADMIN'), auditLogger('DELETE', 'CUSTOMER'), deleteCustomer);

export default router;
