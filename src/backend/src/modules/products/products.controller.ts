import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth';
import { productsService } from './products.service';
import { handleError } from '../../utils/errors';

export const productsController = {
  create: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product = await productsService.create(req.user!.userId, req.body);
      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const products = await productsService.getAll(req.query);
      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product = await productsService.getById(req.params.id);
      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  update: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product = await productsService.update(req.params.id, req.user!.userId, req.body);
      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await productsService.delete(req.params.id, req.user!.userId);
      res.json({
        success: true,
        message: 'Product deleted',
      });
    } catch (error) {
      handleError(error, res);
    }
  },
};

