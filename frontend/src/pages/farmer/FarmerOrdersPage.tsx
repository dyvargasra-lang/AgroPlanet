import { useState, useEffect } from 'react';
import { ordersService, Order } from '../../services/orders.service';
import './FarmerOrdersPage.css';

export const FarmerOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await ordersService.getAll('farmer');
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, estado: string) => {
    try {
      await ordersService.updateStatus(orderId, estado);
      loadOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error al actualizar pedido');
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
    <div className="farmer-orders-page">
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
              <p className="order-buyer">Comprador: {order.buyer.nombre}</p>
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
              {order.estado === 'PENDIENTE' && (
                <div className="order-actions">
                  <button
                    onClick={() => updateStatus(order.id, 'ACEPTADO')}
                    className="accept-btn"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, 'RECHAZADO')}
                    className="reject-btn"
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, 'NEGOCIACION')}
                    className="negotiate-btn"
                  >
                    Negociar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

