# Diagramas y Requisitos del Sistema AgroPlanet

# Requisitos Funcionales

| Código | Requisito funcional                | Descripción                                                                                                                                               | Actor principal                     | Prioridad |
|--------|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------|-----------|
| RF-01  | Registro de usuarios                | El sistema debe permitir que los usuarios (agricultores, compradores y administradores) se registren ingresando sus datos personales y verificación por correo. | Agricultor / Comprador / Administrador | Alta      |
| RF-02  | Inicio y cierre de sesión           | Los usuarios deben poder iniciar sesión con sus credenciales registradas y cerrar sesión de forma segura.                                                  | Todos                                | Alta      |
| RF-03  | Gestión del perfil de usuario       | Cada usuario podrá visualizar y actualizar su información personal como nombre, teléfono y ubicación.                                                      | Todos                                | Media     |
| RF-04  | Publicación de productos            | El agricultor debe poder registrar productos indicando nombre, descripción, precio, cantidad disponible e imagen.                                           | Agricultor                           | Alta      |
| RF-05  | Edición y eliminación de publicaciones | El agricultor podrá modificar o eliminar productos publicados en cualquier momento.                                                                         | Agricultor                           | Alta      |
| RF-06  | Búsqueda y filtrado de productos    | El comprador podrá buscar productos usando criterios como nombre, categoría, ubicación o rango de precios.                                                  | Comprador                            | Alta      |
| RF-07  | Visualización de detalle del producto | El sistema debe mostrar información detallada del producto (nombre, descripción, precio, disponibilidad, datos del agricultor).                             | Comprador                            | Media     |
| RF-08  | Envío de solicitud de pedido        | El comprador podrá seleccionar un producto, indicar cantidad y enviar la solicitud de pedido al agricultor.                                                 | Comprador                            | Alta      |
| RF-09  | Gestión de pedidos                  | El agricultor podrá aceptar, rechazar o negociar solicitudes de pedido; el sistema registra cambios en tiempo real.                                         | Agricultor                           | Alta      |
| RF-10  | Notificaciones del sistema          | El sistema debe generar notificaciones internas o por correo cuando se creen, modifiquen o confirmen pedidos.                                               | Agricultor / Comprador               | Media     |
| RF-11  | Panel de administración             | El administrador podrá supervisar actividades como registro de usuarios, publicaciones y transacciones.                                                     | Administrador                        | Media     |
| RF-12  | Generación de reportes              | El sistema debe permitir generar reportes básicos sobre publicaciones, usuarios y transacciones.                                                             | Administrador / Agricultor           | Media     |
| RF-13  | Registro de auditoría               | El sistema debe mantener un registro histórico de acciones críticas como altas, bajas y modificaciones.                                                     | Administrador                        | Media     |
| RF-14  | Recuperación de contraseña          | Los usuarios podrán recuperar el acceso mediante un enlace temporal enviado al correo registrado.                                                           | Todos                                | Media     |

## 2. Requisitos No Funcionales

| Código | Categoría        | Requisito no funcional                                                                                                                                         |
|--------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RNF-01 | Seguridad         | El sistema debe implementar autenticación mediante tokens (JWT) y cifrado de contraseñas, garantizando la confidencialidad de los datos.                      |
| RNF-02 | Seguridad         | Toda la comunicación entre cliente y servidor debe realizarse a través de protocolo seguro HTTPS, evitando accesos no autorizados.                            |
| RNF-03 | Disponibilidad    | La plataforma debe mantenerse operativa durante el periodo de pruebas y ejecución piloto, con una disponibilidad superior al 99 %.                            |
| RNF-04 | Rendimiento       | El sistema debe responder de manera ágil a las operaciones más comunes, manteniendo tiempos de carga adecuados para los usuarios.                             |
| RNF-05 | Usabilidad        | La interfaz debe ser sencilla, clara e intuitiva, considerando que parte de los usuarios pueden tener poca experiencia tecnológica.                           |
| RNF-06 | Compatibilidad    | La aplicación debe funcionar correctamente en los navegadores más utilizados (Chrome, Edge, Firefox, Safari) y en dispositivos móviles.                        |
| RNF-07 | Escalabilidad     | La arquitectura del sistema debe permitir la incorporación de nuevos módulos o funcionalidades sin afectar su rendimiento general.                             |
| RNF-08 | Consumo de datos  | El sistema debe optimizar el uso de recursos para reducir el consumo de datos en zonas rurales con conectividad limitada.                                      |
| RNF-09 | Accesibilidad     | El diseño visual debe garantizar buena legibilidad, contraste adecuado y elementos de navegación accesibles.                                                    |
| RNF-10 | Mantenibilidad    | El código del sistema debe estructurarse de forma modular y versionarse en un repositorio central para facilitar futuras actualizaciones.                       |
| RNF-11 | Registro y monitoreo | El sistema debe generar registros de actividad y monitoreo básico de errores y rendimiento.                                                                   |
| RNF-12 | Privacidad        | Los datos personales recolectados deben limitarse a la información necesaria, cumpliendo principios de protección de datos.                                    |

## 3. Diagramas del sistema

### 3.1 Modelo Entidad–Relación
Se incluye el MER presentado en el documento maestro (Figura correspondiente), el cual contiene:
- Usuario
- Productos
- Pedidos
- Carrito o ítems del pedido
- Mensajes

### 3.2 Diagrama de flujo del sistema
Incluye el diagrama del proceso general donde:
1. El usuario selecciona rol.
2. El agricultor publica productos.
3. El comprador busca productos.
4. Se genera una interacción (pedido → chat → pago).

### 3.3 Diagrama de casos de uso (nuevo)
**Actores:** Agricultor, Comprador, Sistema  
**Casos de uso:**
- CU01: Registrarse
- CU02: Publicar producto
- CU03: Buscar producto
- CU04: Realizar pedido
- CU05: Comunicarse (chat)
- CU06: Simular pago

### 3.4 Diagrama de navegación
Incluye las pantallas del prototipo:
- Inicio → Login → Selección de rol
- Panel del agricultor → Registrar producto → Lista de productos
- Catálogo del comprador → Detalle → Pedido → Pago
- Chat
- Mapa