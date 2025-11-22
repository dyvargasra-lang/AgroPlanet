# AgroPlanet Backend

API REST para AgroPlanet construida con Node.js, Express, TypeScript y Prisma.

## Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/logout` - Cerrar sesión
- `POST /api/auth/forgot` - Recuperación de contraseña

### Usuarios
- `GET /api/users/me` - Obtener usuario actual

### Perfiles
- `PATCH /api/profiles/me` - Actualizar perfil

### Productos
- `GET /api/products` - Listar productos (con filtros)
- `GET /api/products/:id` - Obtener producto
- `POST /api/products` - Crear producto (FARMER)
- `PATCH /api/products/:id` - Actualizar producto (FARMER)
- `DELETE /api/products/:id` - Eliminar producto (FARMER)

### Pedidos
- `POST /api/orders` - Crear pedido (BUYER)
- `GET /api/orders` - Listar pedidos
- `GET /api/orders/:id` - Obtener pedido
- `PATCH /api/orders/:id/status` - Actualizar estado (FARMER)

### Pagos
- `POST /api/payments` - Crear pago
- `GET /api/payments/:id` - Obtener pago
- `PATCH /api/payments/:id/status` - Actualizar estado de pago

### Mensajes
- `POST /api/messages` - Enviar mensaje
- `GET /api/messages/thread` - Obtener hilo de conversación

### Notificaciones
- `GET /api/notifications` - Listar notificaciones
- `PATCH /api/notifications/:id/read` - Marcar como leída

### Health
- `GET /api/health` - Health check

## Variables de Entorno

Ver `.env.example` para las variables requeridas.

## Scripts

- `npm run dev` - Iniciar en modo desarrollo
- `npm run build` - Compilar TypeScript
- `npm start` - Iniciar en producción
- `npm test` - Ejecutar tests
- `npm run prisma:migrate` - Ejecutar migraciones
- `npm run prisma:studio` - Abrir Prisma Studio

