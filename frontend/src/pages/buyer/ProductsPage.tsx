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
      <h1>Productos</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={filters.search || ''}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Categoría"
          value={filters.categoria || ''}
          onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
          className="filter-input"
        />
        <input
          type="number"
          placeholder="Precio mínimo"
          value={filters.min || ''}
          onChange={(e) => setFilters({ ...filters, min: e.target.value })}
          className="filter-input"
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={filters.max || ''}
          onChange={(e) => setFilters({ ...filters, max: e.target.value })}
          className="filter-input"
        />
      </div>

      {loading ? (
        <div className="loading">Cargando productos...</div>
      ) : products.length === 0 ? (
        <div className="empty">No se encontraron productos</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="product-card">
              {product.imagenUrl && (
                <img src={product.imagenUrl} alt={product.nombre} className="product-image" />
              )}
              <div className="product-info">
                <h3>{product.nombre}</h3>
                <p className="product-category">{product.categoria}</p>
                <p className="product-price">${product.precio}</p>
                <p className="product-stock">Stock: {product.cantidad}</p>
                <p className="product-farmer">Por: {product.farmer.nombre}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

