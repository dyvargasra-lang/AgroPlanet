import { Router } from 'express';
import { productsController } from './products.controller';
import { authenticate, requireRole } from '../../middlewares/auth';
import { auditMiddleware } from '../../middlewares/audit';

const router = Router();

router.post(
  '/',
  authenticate,
  requireRole('FARMER', 'ADMIN'),
  auditMiddleware('CREATE', 'product'),
  productsController.create
);
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.patch(
  '/:id',
  authenticate,
  requireRole('FARMER', 'ADMIN'),
  auditMiddleware('UPDATE', 'product'),
  productsController.update
);
router.delete(
  '/:id',
  authenticate,
  requireRole('FARMER', 'ADMIN'),
  auditMiddleware('DELETE', 'product'),
  productsController.delete
);

export default router;

