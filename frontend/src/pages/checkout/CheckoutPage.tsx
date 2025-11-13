import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersService } from '../../services/orders.service';
import './CheckoutPage.css';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart] = useState<Array<{ productId: string; cantidad: number; precioUnitario: number }>>(
    JSON.parse(localStorage.getItem('cart') || '[]')
  );
  const [direccionEntrega, setDireccionEntrega] = useState('');
  const [contacto, setContacto] = useState('');
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.cantidad * item.precioUnitario, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // TODO: Obtener farmerId del primer producto
    const farmerId = 'farmer-id-placeholder'; // Esto debería venir del producto

    setLoading(true);
    try {
      await ordersService.create({
        farmerId,
        items: cart,
        direccionEntrega,
        contacto,
      });
      localStorage.removeItem('cart');
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al crear pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Información de Entrega</h2>
          <div className="form-group">
            <label>Dirección de Entrega</label>
            <input
              type="text"
              value={direccionEntrega}
              onChange={(e) => setDireccionEntrega(e.target.value)}
              placeholder="Ingresa la dirección de entrega"
            />
          </div>
          <div className="form-group">
            <label>Contacto</label>
            <input
              type="text"
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
              placeholder="Teléfono o email de contacto"
            />
          </div>
        </div>
        <div className="checkout-summary">
          <h2>Resumen</h2>
          <div className="summary-items">
            {cart.map((item, idx) => (
              <div key={idx} className="summary-item">
                <span>Producto {idx + 1}</span>
                <span>
                  {item.cantidad} x ${item.precioUnitario} = ${item.cantidad * item.precioUnitario}
                </span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <strong>Total: ${total}</strong>
          </div>
          <button onClick={handleCheckout} disabled={loading || cart.length === 0} className="checkout-btn">
            {loading ? 'Procesando...' : 'Confirmar Pedido'}
          </button>
        </div>
      </div>
    </div>
  );
};

