import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from './auth';

export const auditMiddleware = (action: string, entity: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const originalJson = res.json.bind(res);

    res.json = function (body: unknown) {
      // Log after response is sent
      setImmediate(async () => {
        try {
          await prisma.auditLog.create({
            data: {
              userId: req.user?.userId,
              accion: action,
              entidad: entity,
              entidadId: (req.params.id || (body as { data?: { id?: string } })?.data?.id) || null,
              detalle: JSON.stringify({
                method: req.method,
                path: req.path,
                body: req.method !== 'GET' ? req.body : undefined,
              }),
            },
          });
        } catch (error) {
          // Don't fail request if audit fails
          console.error('Audit log error:', error);
        }
      });

      return originalJson(body);
    };

    next();
  };
};

