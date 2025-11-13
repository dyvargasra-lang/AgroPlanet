import { prisma } from '../../config/db';
import { AppError } from '../../utils/errors';

export const notificationsService = {
  getAll: async (userId: string) => {
    return prisma.notification.findMany({
      where: { userId },
      include: {
        order: {
          select: {
            id: true,
            estado: true,
          },
        },
        product: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: { fecha: 'desc' },
    });
  },

  markAsRead: async (id: string, userId: string) => {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new AppError(404, 'Notification not found');
    }

    if (notification.userId !== userId) {
      throw new AppError(403, 'Not authorized');
    }

    return prisma.notification.update({
      where: { id },
      data: { leida: true },
    });
  },

  create: async (data: {
    userId: string;
    tipo: string;
    mensaje: string;
    orderId?: string;
    productId?: string;
  }) => {
    return prisma.notification.create({
      data,
    });
  },
};

