import { Router } from 'express';
import { profilesController } from './profiles.controller';
import { authenticate } from '../../middlewares/auth';
import { auditMiddleware } from '../../middlewares/audit';

const router = Router();

router.patch(
  '/me',
  authenticate,
  auditMiddleware('UPDATE', 'profile'),
  profilesController.updateMe
);

export default router;

