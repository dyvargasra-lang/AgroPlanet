import { Router } from 'express';
import { ordersController } from './orders.controller';
import { authenticate, requireRole } from '../../middlewares/auth';
import { auditMiddleware } from '../../middlewares/audit';

const router = Router();

router.post(
  '/',
  authenticate,
  requireRole('BUYER', 'ADMIN'),
  auditMiddleware('CREATE', 'order'),
  ordersController.create
);
router.get('/', authenticate, ordersController.getAll);
router.get('/:id', authenticate, ordersController.getById);
router.patch(
  '/:id/status',
  authenticate,
  requireRole('FARMER', 'ADMIN'),
  auditMiddleware('UPDATE', 'order'),
  ordersController.updateStatus
);

export default router;

