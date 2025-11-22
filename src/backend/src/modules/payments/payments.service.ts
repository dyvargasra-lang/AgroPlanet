import { z } from 'zod';
import { prisma } from '../../config/db';
import { AppError } from '../../utils/errors';

const createPaymentSchema = z.object({
  orderId: z.string().uuid(),
  metodo: z.enum(['PSE', 'EFECTIVO', 'OTRO']),
  referencia: z.string().optional(),
  monto: z.number().positive(),
});

export const paymentsService = {
  create: async (data: unknown) => {
    const validated = createPaymentSchema.parse(data);

    // Verify order exists
    const order = await prisma.order.findUnique({
      where: { id: validated.orderId },
    });

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    if (Math.abs(Number(order.total) - validated.monto) > 0.01) {
      throw new AppError(400, 'Payment amount does not match order total');
    }

    return prisma.payment.create({
      data: validated,
      include: {
        order: true,
      },
    });
  },

  getById: async (id: string) => {
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        order: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!payment) {
      throw new AppError(404, 'Payment not found');
    }

    return payment;
  },

  updateStatus: async (id: string, estado: string) => {
    const validStatuses = ['PENDIENTE', 'APROBADO', 'FALLIDO'];
    if (!validStatuses.includes(estado)) {
      throw new AppError(400, 'Invalid payment status');
    }

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { order: true },
    });

    if (!payment) {
      throw new AppError(404, 'Payment not found');
    }

    const updated = await prisma.payment.update({
      where: { id },
      data: { estado },
      include: {
        order: true,
      },
    });

    // If payment approved, mark order as confirmed
    if (estado === 'APROBADO' && payment.order.estado !== 'CONFIRMADO') {
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { estado: 'CONFIRMADO' },
      });
    }

    return updated;
  },
};

