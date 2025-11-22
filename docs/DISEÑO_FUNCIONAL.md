# Diseño Funcional del Sistema AgroPlanet

## 1. Descripción general
El sistema AgroPlanet está diseñado para facilitar la interacción directa entre agricultores y compradores mediante una plataforma web que permite publicar productos agrícolas, gestionar pedidos, comunicarse a través de un módulo de mensajería y visualizar ubicaciones geográficas de productores.

## 2. Funcionalidades principales

### 2.1 Módulo de autenticación
- Permite el registro e inicio de sesión.
- El usuario selecciona su rol (agricultor o comprador).
- Controla accesos y permisos.

### 2.2 Módulo del agricultor
- Publicación de productos agrícolas.
- Edición y eliminación de productos.
- Visualización del inventario y actualización de cantidades.

### 2.3 Módulo del comprador
- Búsqueda y filtrado de productos.
- Visualización de detalles del productor.
- Envío de pedidos.

### 2.4 Módulo de pedidos
- Registro de pedidos generados por compradores.
- Resumen del pedido con detalles del productor y del producto.
- Actualización del estado del pedido.

### 2.5 Módulo de comunicación (chat)
- Intercambio de mensajes entre comprador y agricultor.
- Comunicación vinculada al producto o al pedido realizado.

### 2.6 Módulo de pagos
- Simulación de pago (PSE u otros métodos).
- Registro básico de datos de pago.

### 2.7 Módulo de geolocalización
- Visualización del mapa con productores cercanos.
- Marcadores con información básica del agricultor.

---

## 3. Flujos funcionales principales

### 3.1 Flujo del comprador
1. Inicia sesión.
2. Busca un producto.
3. Revisa detalles del productor.
4. Envía pedido.
5. Se comunica vía chat.
6. Finaliza pago simulado.

### 3.2 Flujo del agricultor
1. Inicia sesión.
2. Publica producto.
3. Edita inventario.
4. Recibe pedidos.
5. Responde mensajes.

---

## 4. Reglas de negocio
- Un usuario solo puede tener un rol activo.
- Los agricultores solo administran sus propios productos.
- Los compradores no pueden modificar inventario.
- El pago simulado no es transaccional; solo registra datos.
