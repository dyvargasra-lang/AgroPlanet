import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth';
import { profilesService } from './profiles.service';
import { handleError } from '../../utils/errors';

export const profilesController = {
  updateMe: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const profile = await profilesService.upsert(req.user!.userId, req.body);
      res.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
};

