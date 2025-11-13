import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsService, Product } from '../../services/products.service';
import { ordersService } from '../../services/orders.service';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [cart, setCart] = useState<Array<{ productId: string; cantidad: number; precioUnitario: number }>>(
    JSON.parse(localStorage.getItem('cart') || '[]')
  );

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await productsService.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!product) return;
    const newItem = {
      productId: product.id,
      cantidad,
      precioUnitario: Number(product.precio),
    };
    const updatedCart = [...cart, newItem];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Producto agregado al carrito');
  };

  if (loading) {
    return <div className="loading">Cargando producto...</div>;
  }

  if (!product) {
    return <div className="error">Producto no encontrado</div>;
  }

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Volver
      </button>
      <div className="product-detail">
        {product.imagenUrl && (
          <img src={product.imagenUrl} alt={product.nombre} className="detail-image" />
        )}
        <div className="detail-info">
          <h1>{product.nombre}</h1>
          <p className="category">{product.categoria}</p>
          <p className="price">${product.precio}</p>
          <p className="stock">Stock disponible: {product.cantidad}</p>
          {product.descripcion && <p className="description">{product.descripcion}</p>}
          <div className="farmer-info">
            <h3>Agricultor</h3>
            <p>{product.farmer.nombre}</p>
            {product.farmer.profile?.ubicacion && <p>📍 {product.farmer.profile.ubicacion}</p>}
          </div>
          <div className="purchase-section">
            <div className="quantity-selector">
              <label>Cantidad:</label>
              <input
                type="number"
                min="1"
                max={product.cantidad}
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              />
            </div>
            <button onClick={addToCart} className="add-to-cart-btn" disabled={product.cantidad === 0}>
              Agregar al Carrito
            </button>
            <button
              onClick={() => navigate('/checkout')}
              className="buy-now-btn"
              disabled={product.cantidad === 0}
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

