import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middlewares/auth';
import { authLimiter } from '../../middlewares/rateLimit';

const router = Router();

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/forgot', authLimiter, authController.forgotPassword);

export default router;

