import { prisma } from '../../config/db';
import { AppError } from '../../utils/errors';

export const usersService = {
  getById: async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        estado: true,
        createdAt: true,
        profile: true,
      },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return user;
  },
};

