import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/db';

export const healthController = {
  check: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Check database connection
      await prisma.$queryRaw`SELECT 1`;

      res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
      });
    } catch (error) {
      res.status(503).json({
        success: false,
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
      });
    }
  },
};

