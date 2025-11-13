import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth';
import { ordersService } from './orders.service';
import { handleError } from '../../utils/errors';

export const ordersController = {
  create: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const order = await ordersService.create(req.user!.userId, req.body);
      res.status(201).json({
        success: true,
        data: order,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const order = await ordersService.getById(req.params.id);
      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  getAll: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const role = req.query.role as string;
      const orders = await ordersService.getAll(req.user!.userId, req.user!.rol, role);
      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  updateStatus: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const order = await ordersService.updateStatus(
        req.params.id,
        req.user!.userId,
        req.user!.rol,
        req.body.estado
      );
      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
};

