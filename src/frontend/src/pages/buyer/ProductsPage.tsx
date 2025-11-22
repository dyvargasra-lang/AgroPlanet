import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsService, Product, ProductFilters } from '../../services/products.service';
import './ProductsPage.css';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({});

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productsService.getAll(filters);
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="products-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar producto"
          value={filters.search || ''}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <span className="search-icon">🔍</span>
      </div>

      {loading ? (
        <div className="loading">Cargando productos...</div>
      ) : products.length === 0 ? (
        <div className="empty">No se encontraron productos</div>
      ) : (
        <>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {product.imagenUrl ? (
                  <img src={product.imagenUrl} alt={product.nombre} className="product-image" />
                ) : (
                  <div className="product-image" style={{ background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    🍎
                  </div>
                )}
                <div className="product-info">
                  <h3>{product.nombre}</h3>
                  <p className="product-details">Cantidad disponible: {product.cantidad} unidades</p>
                  <p className="product-price">precio unidad: {product.precio} pesos</p>
                  <button className="add-to-cart-btn">Agregar Compra</button>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-footer">
            <span className="cart-icon">🛒</span>
            <button className="checkout-btn">Paga tu compra</button>
          </div>
        </>
      )}
    </div>
  );
};

