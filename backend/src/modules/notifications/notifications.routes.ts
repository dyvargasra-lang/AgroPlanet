import { Router } from 'express';
import { notificationsController } from './notifications.controller';
import { authenticate } from '../../middlewares/auth';

const router = Router();

router.get('/', authenticate, notificationsController.getAll);
router.patch('/:id/read', authenticate, notificationsController.markAsRead);

export default router;

