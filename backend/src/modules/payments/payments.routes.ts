import { Router } from 'express';
import { paymentsController } from './payments.controller';
import { authenticate } from '../../middlewares/auth';
import { auditMiddleware } from '../../middlewares/audit';

const router = Router();

router.post(
  '/',
  authenticate,
  auditMiddleware('CREATE', 'payment'),
  paymentsController.create
);
router.get('/:id', authenticate, paymentsController.getById);
router.patch(
  '/:id/status',
  authenticate,
  auditMiddleware('UPDATE', 'payment'),
  paymentsController.updateStatus
);

export default router;

