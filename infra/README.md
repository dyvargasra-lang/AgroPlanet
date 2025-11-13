# Infraestructura

Este directorio contiene scripts y configuraciones para despliegue.

## Migraciones

Las migraciones de Prisma se generan automáticamente con:
```bash
cd backend
npx prisma migrate dev
```

## Seeds

Para poblar la base de datos con datos de prueba, crear un archivo `seed.ts` en `backend/prisma/`.

## Despliegue

Ver documentación de despliegue en AWS en el documento Fase3_G20.

