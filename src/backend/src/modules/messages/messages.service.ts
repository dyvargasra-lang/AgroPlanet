import { z } from 'zod';
import { prisma } from '../../config/db';
import { AppError } from '../../utils/errors';

const createMessageSchema = z.object({
  receptorId: z.string().uuid(),
  orderId: z.string().uuid().optional(),
  contenido: z.string().min(1).max(1000),
});

export const messagesService = {
  create: async (emisorId: string, data: unknown) => {
    const validated = createMessageSchema.parse(data);

    if (emisorId === validated.receptorId) {
      throw new AppError(400, 'Cannot send message to yourself');
    }

    return prisma.message.create({
      data: {
        emisorId,
        receptorId: validated.receptorId,
        orderId: validated.orderId,
        contenido: validated.contenido,
      },
      include: {
        emisor: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
        receptor: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
        order: {
          select: {
            id: true,
            estado: true,
          },
        },
      },
    });
  },

  getThread: async (userId: string, otherUserId?: string, orderId?: string) => {
    const where: Record<string, unknown> = {
      OR: [
        { emisorId: userId },
        { receptorId: userId },
      ],
    };

    if (otherUserId) {
      where.AND = [
        {
          OR: [
            { emisorId: userId, receptorId: otherUserId },
            { emisorId: otherUserId, receptorId: userId },
          ],
        },
      ];
    }

    if (orderId) {
      where.orderId = orderId;
    }

    return prisma.message.findMany({
      where,
      include: {
        emisor: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
        receptor: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
        order: {
          select: {
            id: true,
            estado: true,
          },
        },
      },
      orderBy: { fecha: 'asc' },
    });
  },
};

