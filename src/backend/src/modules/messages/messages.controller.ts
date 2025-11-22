import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth';
import { messagesService } from './messages.service';
import { handleError } from '../../utils/errors';

export const messagesController = {
  create: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const message = await messagesService.create(req.user!.userId, req.body);
      res.status(201).json({
        success: true,
        data: message,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  getThread: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const messages = await messagesService.getThread(
        req.user!.userId,
        req.query.user as string,
        req.query.order as string | undefined
      );
      res.json({
        success: true,
        data: messages,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
};

