import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth';
import { paymentsService } from './payments.service';
import { handleError } from '../../utils/errors';

export const paymentsController = {
  create: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payment = await paymentsService.create(req.body);
      res.status(201).json({
        success: true,
        data: payment,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payment = await paymentsService.getById(req.params.id);
      res.json({
        success: true,
        data: payment,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  updateStatus: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payment = await paymentsService.updateStatus(req.params.id, req.body.estado);
      res.json({
        success: true,
        data: payment,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
};

