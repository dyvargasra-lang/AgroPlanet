# AgroPlanet

Plataforma digital para la comercialización directa y sostenible de productos agrícolas

Monorepo para la plataforma AgroPlanet - Sistema de gestión agrícola con arquitectura cliente-servidor.

## Stack Tecnológico

- **Frontend**: React + TypeScript + React Router + Zustand
- **Backend**: Node.js + Express + TypeScript
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Autenticación**: JWT + bcrypt
- **Validación**: Zod
- **Logging**: Pino
- **Testing**: Jest/Vitest
- **Linting**: ESLint + Prettier

## Estructura del Proyecto

```
agroplanet/
├── backend/          # API REST con Express
├── frontend/         # Aplicación React
├── infra/            # Scripts de despliegue y migraciones
└── docker-compose.yml
```

## Requisitos Previos

- Node.js 18+
- Docker y Docker Compose
- PostgreSQL 14+ (o usar Docker Compose)

## Subir código a GitHub

Si necesitas subir este código al repositorio de GitHub, consulta el archivo [GIT_SETUP.md](./GIT_SETUP.md) para instrucciones detalladas.

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Configurar variables de entorno:
   - Copiar `.env.example` a `.env` en backend/
   - Configurar DATABASE_URL, JWT_SECRET, etc.

4. Iniciar servicios con Docker Compose:
   ```bash
   docker-compose up -d
   ```

5. Ejecutar migraciones:
   ```bash
   cd backend
   npx prisma migrate dev
   ```

6. Iniciar desarrollo:
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

## Módulos Implementados

- ✅ Autenticación (JWT)
- ✅ Usuarios y Perfiles
- ✅ Productos
- ✅ Pedidos y Order Items
- ✅ Pagos (simulado)
- ✅ Mensajes/Chat
- ✅ Notificaciones
- ✅ Auditoría
- ✅ Health Check

## API Endpoints

Ver documentación en `/backend/README.md`

## Testing

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## Licencia

MIT
