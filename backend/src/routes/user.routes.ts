import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth';
import { auditLogger } from '../middleware/auditLogger';

const router = Router();

router.use(authenticate);
router.use(authorize('ADMIN'));

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', auditLogger('CREATE', 'USER'), createUser);
router.put('/:id', auditLogger('UPDATE', 'USER'), updateUser);
router.delete('/:id', auditLogger('DELETE', 'USER'), deleteUser);

export default router;
