import { z } from 'zod';
import { prisma } from '../../config/db';

const updateProfileSchema = z.object({
  telefono: z.string().optional(),
  ubicacion: z.string().optional(),
  fotoUrl: z.string().url().optional(),
});

export const profilesService = {
  upsert: async (userId: string, data: unknown) => {
    const validated = updateProfileSchema.parse(data);
    return prisma.profile.upsert({
      where: { userId },
      update: validated,
      create: {
        userId,
        ...validated,
      },
    });
  },
};

