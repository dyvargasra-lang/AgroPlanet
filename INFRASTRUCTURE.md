# Guía de Infraestructura - AgroPlanet

## Estructura del Monorepo

```
agroplanet/
├── backend/          # API REST (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── modules/     # Módulos de negocio
│   │   ├── middlewares/ # Middlewares (auth, audit, rate limit)
│   │   ├── config/       # Configuración (DB, env)
│   │   └── utils/        # Utilidades
│   ├── prisma/           # Esquema y migraciones
│   └── tests/            # Pruebas
├── frontend/        # Aplicación React + TypeScript
│   ├── src/
│   │   ├── pages/       # Páginas de la aplicación
│   │   ├── components/  # Componentes reutilizables
│   │   ├── services/    # Servicios API
│   │   ├── store/       # Estado global (Zustand)
│   │   └── styles/      # Estilos globales
│   └── public/          # Archivos estáticos
└── infra/           # Scripts de despliegue y migraciones
```

## Base de Datos

### Esquema Principal

- **users**: Usuarios del sistema (FARMER, BUYER, ADMIN)
- **profiles**: Perfiles extendidos de usuarios
- **products**: Productos agrícolas
- **orders**: Pedidos
- **order_items**: Items de pedidos
- **payments**: Pagos (simulado)
- **messages**: Mensajes/chat
- **notifications**: Notificaciones
- **audit_logs**: Registros de auditoría

### Migraciones

```bash
cd backend
npx prisma migrate dev --name init
```

## Despliegue

### Desarrollo Local

1. Iniciar PostgreSQL con Docker:
```bash
docker-compose up -d postgres
```

2. Configurar variables de entorno:
```bash
cd backend
cp .env.example .env
# Editar .env con tus valores
```

3. Ejecutar migraciones:
```bash
npx prisma migrate dev
npx prisma generate
```

4. Iniciar servicios:
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Producción (AWS)

Ver documentación en Fase3_G20 para:
- Configuración de RDS (PostgreSQL)
- Despliegue de backend en EC2/ECS
- Despliegue de frontend en S3 + CloudFront
- Configuración de HTTPS
- Variables de entorno en producción

## Seguridad

- JWT para autenticación
- Bcrypt para hash de contraseñas
- Rate limiting en endpoints de autenticación
- CORS configurado
- Validación con Zod
- Middleware de auditoría

## Monitoreo

- Health check endpoint: `/api/health`
- Logging con Pino
- Audit logs en base de datos

