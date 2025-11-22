import bcrypt from 'bcrypt';
import { z } from 'zod';
import { prisma } from '../../config/db';
import { generateToken } from '../../utils/jwt';
import { AppError } from '../../utils/errors';

const registerSchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  rol: z.enum(['FARMER', 'BUYER', 'ADMIN']).default('BUYER'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authService = {
  register: async (data: unknown) => {
    const validated = registerSchema.parse(data);
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      throw new AppError(400, 'Email already registered');
    }

    const passwordHash = await bcrypt.hash(validated.password, 10);
    const user = await prisma.user.create({
      data: {
        nombre: validated.nombre,
        email: validated.email,
        passwordHash,
        rol: validated.rol,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        estado: true,
        createdAt: true,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      rol: user.rol,
    });

    return {
      user,
      token,
    };
  },

  login: async (email: string, password: string) => {
    const validated = loginSchema.parse({ email, password });
    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (!user || user.estado !== 'ACTIVO') {
      throw new AppError(401, 'Invalid credentials');
    }

    const isValid = await bcrypt.compare(validated.password, user.passwordHash);
    if (!isValid) {
      throw new AppError(401, 'Invalid credentials');
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      rol: user.rol,
    });

    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        estado: user.estado,
      },
      token,
    };
  },

  forgotPassword: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists
      return;
    }

    // In production, send email with reset token
    // For now, just log
    console.log(`Password reset requested for: ${email}`);
  },
};

