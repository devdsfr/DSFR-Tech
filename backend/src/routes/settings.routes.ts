import { Router } from 'express';
import {
  getBranding,
  updateBranding,
} from '../controllers/settings.controller';
import { authenticate, authorize } from '../middleware/auth';
import { auditLogger } from '../middleware/auditLogger';

const router = Router();

router.use(authenticate);

router.get('/branding', getBranding);
router.put('/branding', authorize('ADMIN'), auditLogger('UPDATE', 'BRANDING'), updateBranding);

export default router;
