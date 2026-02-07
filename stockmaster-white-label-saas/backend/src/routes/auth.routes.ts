import { Router } from 'express';
import { login, register, verifyToken, enable2FA, verify2FA, disable2FA } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/verify', authenticate, verifyToken);
router.post('/2fa/enable', authenticate, enable2FA);
router.post('/2fa/verify', authenticate, verify2FA);
router.post('/2fa/disable', authenticate, disable2FA);

export default router;
