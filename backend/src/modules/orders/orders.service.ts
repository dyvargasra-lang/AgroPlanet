import { z } from 'zod';
import { prisma } from '../../config/db';
import { AppError } from '../../utils/errors';

const createOrderSchema = z.object({
  farmerId: z.string().uuid(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      cantidad: z.number().int().positive(),
      precioUnitario: z.number().positive(),
    })
  ),
  direccionEntrega: z.string().optional(),
  contacto: z.string().optional(),
});

export const ordersService = {
  create: async (buyerId: string, data: unknown) => {
    const validated = createOrderSchema.parse(data);
    const { items, ...orderData } = validated;

    // Calculate total
    const total = items.reduce((sum, item) => sum + item.cantidad * item.precioUnitario, 0);

    // Check product availability and decrement stock
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product || !product.activo) {
        throw new AppError(404, `Product ${item.productId} not found or inactive`);
      }

      if (product.cantidad < item.cantidad) {
        throw new AppError(400, `Insufficient stock for product ${product.nombre}`);
      }

      if (product.farmerId !== validated.farmerId) {
        throw new AppError(400, 'All products must belong to the same farmer');
      }
    }

    return prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          buyerId,
          farmerId: validated.farmerId,
          total,
          direccionEntrega: orderData.direccionEntrega,
          contacto: orderData.contacto,
          items: {
            create: items,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          buyer: {
            select: {
              id: true,
              nombre: true,
              email: true,
            },
          },
          farmer: {
            select: {
              id: true,
              nombre: true,
              email: true,
            },
          },
        },
      });

      // Decrement stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            cantidad: {
              decrement: item.cantidad,
            },
          },
        });
      }

      return order;
    });
  },

  getById: async (id: string) => {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        buyer: {
          select: {
            id: true,
            nombre: true,
            email: true,
            profile: true,
          },
        },
        farmer: {
          select: {
            id: true,
            nombre: true,
            email: true,
            profile: true,
          },
        },
        payments: true,
      },
    });

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    return order;
  },

  getAll: async (userId: string, rol: string, roleFilter?: string) => {
    const where: Record<string, unknown> = {};

    if (roleFilter === 'buyer' || rol === 'BUYER') {
      where.buyerId = userId;
    } else if (roleFilter === 'farmer' || rol === 'FARMER') {
      where.farmerId = userId;
    } else if (rol === 'ADMIN') {
      // Admin can see all
    } else {
      // Default: show orders where user is involved
      where.OR = [{ buyerId: userId }, { farmerId: userId }];
    }

    return prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        buyer: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
        farmer: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  updateStatus: async (id: string, userId: string, rol: string, estado: string) => {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    // Only farmer can update status
    if (rol !== 'FARMER' && rol !== 'ADMIN') {
      throw new AppError(403, 'Only farmers can update order status');
    }

    if (order.farmerId !== userId && rol !== 'ADMIN') {
      throw new AppError(403, 'Not authorized to update this order');
    }

    const validStatuses = ['PENDIENTE', 'NEGOCIACION', 'ACEPTADO', 'RECHAZADO', 'CONFIRMADO'];
    if (!validStatuses.includes(estado)) {
      throw new AppError(400, 'Invalid status');
    }

    return prisma.order.update({
      where: { id },
      data: { estado },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        buyer: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
        farmer: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
      },
    });
  },
};

