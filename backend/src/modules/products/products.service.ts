import { z } from 'zod';
import { prisma } from '../../config/db';
import { AppError } from '../../utils/errors';

const createProductSchema = z.object({
  nombre: z.string().min(1).max(200),
  descripcion: z.string().optional(),
  categoria: z.string().min(1),
  precio: z.number().positive(),
  cantidad: z.number().int().min(0),
  imagenUrl: z.string().url().optional(),
});

const updateProductSchema = createProductSchema.partial();

export const productsService = {
  create: async (farmerId: string, data: unknown) => {
    const validated = createProductSchema.parse(data);
    return prisma.product.create({
      data: {
        ...validated,
        farmerId,
      },
      include: {
        farmer: {
          select: {
            id: true,
            nombre: true,
            email: true,
            profile: true,
          },
        },
      },
    });
  },

  getAll: async (query: Record<string, string | undefined>) => {
    const where: Record<string, unknown> = {
      activo: true,
    };

    if (query.search) {
      where.OR = [
        { nombre: { contains: query.search, mode: 'insensitive' } },
        { descripcion: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.categoria) {
      where.categoria = query.categoria;
    }

    if (query.min) {
      where.precio = { ...(where.precio as object), gte: parseFloat(query.min) };
    }

    if (query.max) {
      where.precio = { ...(where.precio as object), lte: parseFloat(query.max) };
    }

    if (query.ubicacion) {
      where.farmer = {
        profile: {
          ubicacion: { contains: query.ubicacion, mode: 'insensitive' },
        },
      };
    }

    return prisma.product.findMany({
      where,
      include: {
        farmer: {
          select: {
            id: true,
            nombre: true,
            profile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  getById: async (id: string) => {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        farmer: {
          select: {
            id: true,
            nombre: true,
            email: true,
            profile: true,
          },
        },
      },
    });

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    return product;
  },

  update: async (id: string, farmerId: string, data: unknown) => {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    if (product.farmerId !== farmerId) {
      throw new AppError(403, 'Not authorized to update this product');
    }

    const validated = updateProductSchema.parse(data);
    return prisma.product.update({
      where: { id },
      data: validated,
      include: {
        farmer: {
          select: {
            id: true,
            nombre: true,
            email: true,
            profile: true,
          },
        },
      },
    });
  },

  delete: async (id: string, farmerId: string) => {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    if (product.farmerId !== farmerId) {
      throw new AppError(403, 'Not authorized to delete this product');
    }

    await prisma.product.update({
      where: { id },
      data: { activo: false },
    });
  },
};

