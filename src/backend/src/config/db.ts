import { PrismaClient } from '@prisma/client';
import pino from 'pino';

const logger = pino({ name: 'prisma' });

export const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' },
  ],
});

prisma.$on('query' as never, (e: { query: string; params: string; duration: number }) => {
  logger.debug({ query: e.query, params: e.params, duration: e.duration }, 'Prisma query');
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

