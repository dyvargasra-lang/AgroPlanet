import { Router } from 'express';
import { messagesController } from './messages.controller';
import { authenticate } from '../../middlewares/auth';

const router = Router();

router.post('/', authenticate, messagesController.create);
router.get('/thread', authenticate, messagesController.getThread);

export default router;

