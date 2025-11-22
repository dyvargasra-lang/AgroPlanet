import { Router } from 'express';
import { usersController } from './users.controller';
import { authenticate } from '../../middlewares/auth';

const router = Router();

router.get('/me', authenticate, usersController.getMe);

export default router;

