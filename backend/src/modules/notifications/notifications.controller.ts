import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth';
import { notificationsService } from './notifications.service';
import { handleError } from '../../utils/errors';

export const notificationsController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notifications = await notificationsService.getAll(req.user!.userId);
      res.json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  markAsRead: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notification = await notificationsService.markAsRead(
        req.params.id,
        req.user!.userId
      );
      res.json({
        success: true,
        data: notification,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
};

