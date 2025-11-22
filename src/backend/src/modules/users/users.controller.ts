import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth';
import { usersService } from './users.service';
import { handleError } from '../../utils/errors';

export const usersController = {
  getMe: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await usersService.getById(req.user!.userId);
      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
};

