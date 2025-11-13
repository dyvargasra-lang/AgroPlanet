# 🌱 AgroPlanet

Plataforma digital para la comercialización directa y sostenible de productos agrícolas, conectando agricultores con compradores de manera eficiente y transparente.

## 📋 Descripción del Proyecto

AgroPlanet es una plataforma web que facilita la comercialización directa de productos agrícolas. Permite a los agricultores gestionar sus productos, inventario y pedidos, mientras que los compradores pueden explorar productos, realizar pedidos y comunicarse directamente con los productores.

### Características Principales

- 🔐 **Autenticación y Autorización**: Sistema de login/registro con roles (Agricultor, Comprador, Admin)
- 🛍️ **Gestión de Productos**: Los agricultores pueden crear, editar y gestionar sus productos
- 🛒 **Sistema de Pedidos**: Los compradores pueden realizar pedidos y los agricultores gestionarlos
- 💬 **Chat en Tiempo Real**: Comunicación directa entre compradores y agricultores
- 💳 **Sistema de Pagos**: Integración para procesamiento de pagos
- 🔔 **Notificaciones**: Sistema de notificaciones para usuarios
- 📊 **Auditoría**: Registro de actividades del sistema
- 🗺️ **Mapa**: Visualización de ubicaciones (en desarrollo)

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** + **TypeScript**
- **React Router** - Navegación
- **Zustand** - Gestión de estado
- **Vite** - Build tool
- **Axios** - Cliente HTTP

### Backend
- **Node.js** + **Express** + **TypeScript**
- **PostgreSQL** - Base de datos
- **Prisma** - ORM
- **JWT** + **bcrypt** - Autenticación
- **Zod** - Validación de esquemas
- **Pino** - Logging
- **Express Rate Limit** - Control de tasa de peticiones

### DevOps
- **Docker** + **Docker Compose** - Contenedorización
- **Vitest** - Testing

## 📁 Estructura del Proyecto

```
agroplanet/
├── backend/              # API REST con Express
│   ├── src/
│   │   ├── modules/      # Módulos de la aplicación
│   │   ├── middlewares/  # Middlewares (auth, rate limit, audit)
│   │   ├── config/       # Configuración (DB, env)
│   │   └── utils/        # Utilidades (JWT, logger, errors)
│   ├── prisma/           # Schema y migraciones de Prisma
│   └── tests/            # Tests del backend
├── frontend/             # Aplicación React
│   ├── src/
│   │   ├── pages/        # Páginas de la aplicación
│   │   ├── components/   # Componentes reutilizables
│   │   ├── services/     # Servicios API
│   │   └── store/        # Estado global (Zustand)
│   └── public/           # Archivos estáticos
├── infra/                # Scripts de despliegue
└── docker-compose.yml    # Configuración de Docker Compose
```

## 🚀 Requisitos Previos

- **Node.js** 18 o superior
- **Docker Desktop** (recomendado) o Docker + Docker Compose
- **Git** (opcional, para clonar el repositorio)

## 📦 Instalación y Ejecución

### Opción 1: Usando Docker Compose (Recomendado)

Esta es la forma más sencilla de ejecutar la aplicación completa:

1. **Asegúrate de que Docker Desktop esté corriendo**

2. **Clonar el repositorio** (si aplica):
   ```bash
   git clone <url-del-repositorio>
   cd agroplanet
   ```

3. **Iniciar todos los servicios con Docker Compose**:
   ```bash
   docker compose up -d --build
   ```

   Esto iniciará:
   - Base de datos PostgreSQL (puerto 5432)
   - Backend API (puerto 3001)
   - Frontend (puerto 3000)

4. **Ejecutar las migraciones de la base de datos**:
   ```bash
   docker compose exec backend npx prisma migrate dev
   ```

5. **Acceder a la aplicación**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api
   - Health Check: http://localhost:3001/api/health

### Opción 2: Ejecución Local (Sin Docker)

Si prefieres ejecutar sin Docker:

1. **Instalar dependencias**:
   ```bash
   # En la raíz del proyecto
   npm install
   
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Configurar PostgreSQL localmente**:
   - Instalar PostgreSQL
   - Crear una base de datos llamada `agroplanet_db`

3. **Configurar variables de entorno**:
   
   Crear archivo `backend/.env`:
   ```env
   NODE_ENV=development
   PORT=3001
   DATABASE_URL=postgresql://usuario:password@localhost:5432/agroplanet_db
   JWT_SECRET=tu-secret-key-de-al-menos-32-caracteres-para-jwt
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Ejecutar migraciones**:
   ```bash
   cd backend
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Iniciar los servicios**:
   
   Terminal 1 - Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 - Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

## 🎯 Comandos Útiles

### Docker Compose

```bash
# Iniciar servicios
docker compose up -d

# Ver logs
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f backend
docker compose logs -f frontend

# Detener servicios
docker compose down

# Detener y eliminar volúmenes (⚠️ elimina datos)
docker compose down -v

# Reconstruir contenedores
docker compose up -d --build
```

### Backend

```bash
cd backend

# Desarrollo
npm run dev

# Compilar
npm run build

# Producción
npm start

# Prisma
npm run prisma:generate    # Generar cliente Prisma
npm run prisma:migrate      # Ejecutar migraciones
npm run prisma:studio       # Abrir Prisma Studio

# Testing
npm test
```

### Frontend

```bash
cd frontend

# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview de producción
npm run preview

# Testing
npm test
```

## 📚 Módulos Implementados

- ✅ **Autenticación**: Login, registro, JWT tokens
- ✅ **Usuarios y Perfiles**: Gestión de usuarios y perfiles
- ✅ **Productos**: CRUD completo de productos (solo agricultores)
- ✅ **Pedidos**: Creación y gestión de pedidos
- ✅ **Pagos**: Sistema de pagos (simulado)
- ✅ **Mensajes/Chat**: Comunicación entre usuarios
- ✅ **Notificaciones**: Sistema de notificaciones
- ✅ **Auditoría**: Registro de actividades
- ✅ **Health Check**: Endpoint de salud del sistema

## 🔌 API Endpoints

Ver documentación completa en [`/backend/README.md`](./backend/README.md)

### Endpoints Principales

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/products` - Listar productos
- `POST /api/products` - Crear producto (FARMER)
- `POST /api/orders` - Crear pedido (BUYER)
- `GET /api/orders` - Listar pedidos
- `POST /api/messages` - Enviar mensaje
- `GET /api/notifications` - Listar notificaciones

## 🧪 Testing

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test

# Todos los tests
npm test
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno del Backend

El backend requiere las siguientes variables de entorno (ver `backend/src/config/env.ts`):

- `NODE_ENV`: Entorno (development/production/test)
- `PORT`: Puerto del servidor (default: 3001)
- `DATABASE_URL`: URL de conexión a PostgreSQL
- `JWT_SECRET`: Secret key para JWT (mínimo 32 caracteres)
- `JWT_EXPIRES_IN`: Expiración del token (default: 7d)
- `CORS_ORIGIN`: Origen permitido para CORS (default: http://localhost:3000)

### Variables de Entorno del Frontend

- `VITE_API_URL`: URL del backend API (default: http://localhost:3001/api)

## 📝 Scripts Disponibles

### Raíz del Proyecto

```bash
npm run dev:backend      # Iniciar backend en desarrollo
npm run dev:frontend     # Iniciar frontend en desarrollo
npm run build:backend    # Compilar backend
npm run build:frontend   # Compilar frontend
npm test                 # Ejecutar todos los tests
npm run lint             # Linter en todos los workspaces
```

## 🐛 Solución de Problemas

### Error: Docker Desktop no está corriendo
- Asegúrate de iniciar Docker Desktop antes de ejecutar `docker compose up`

### Error: Puerto ya en uso
- Verifica que los puertos 3000, 3001 y 5432 no estén en uso
- Puedes cambiar los puertos en `docker-compose.yml`

### Error: Migraciones de Prisma
- Si las migraciones fallan, ejecuta: `docker compose exec backend npx prisma migrate reset`

### Error: Variables de entorno faltantes
- Verifica que el archivo `.env` exista en `backend/` con todas las variables requeridas

## 📄 Licencia

MIT

## 🤝 Contribuir

Si deseas contribuir al proyecto, consulta el archivo [GIT_SETUP.md](./GIT_SETUP.md) para instrucciones sobre cómo configurar Git y subir cambios.
