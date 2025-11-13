import { useState, useEffect } from 'react';
import { ordersService, Order } from '../../services/orders.service';
import './OrdersPage.css';

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await ordersService.getAll('buyer');
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (estado: string) => {
    const colors: Record<string, string> = {
      PENDIENTE: '#ff9800',
      NEGOCIACION: '#2196f3',
      ACEPTADO: '#4caf50',
      RECHAZADO: '#f44336',
      CONFIRMADO: '#2d5016',
    };
    return colors[estado] || '#666';
  };

  if (loading) {
    return <div className="loading">Cargando pedidos...</div>;
  }

  return (
    <div className="orders-page">
      <h1>Mis Pedidos</h1>
      {orders.length === 0 ? (
        <div className="empty">No tienes pedidos</div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Pedido #{order.id.slice(0, 8)}</h3>
                <span className="order-status" style={{ color: getStatusColor(order.estado) }}>
                  {order.estado}
                </span>
              </div>
              <p className="order-farmer">Agricultor: {order.farmer.nombre}</p>
              <div className="order-items">
                <h4>Productos:</h4>
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span>{item.product.nombre}</span>
                    <span>
                      {item.cantidad} x ${item.precioUnitario}
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Total: ${order.total}</strong>
              </div>
              {order.direccionEntrega && (
                <p className="order-address">📍 {order.direccionEntrega}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

