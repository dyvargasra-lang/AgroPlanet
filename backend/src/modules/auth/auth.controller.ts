import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth';
import { authService } from './auth.service';
import { handleError } from '../../utils/errors';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await authService.login(req.body.email, req.body.password);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  logout: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      // JWT is stateless, so logout is handled client-side
      // In production, you might want to use a token blacklist
      res.json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Simulated password reset
      await authService.forgotPassword(req.body.email);
      res.json({
        success: true,
        message: 'If the email exists, a password reset link has been sent',
      });
    } catch (error) {
      handleError(error, res);
    }
  },
};

