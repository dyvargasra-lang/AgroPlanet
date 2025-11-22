import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsService, Product } from '../../services/products.service';
import './FarmerProductsPage.css';

export const FarmerProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: '',
    cantidad: '',
    imagenUrl: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productsService.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productsService.create({
        nombre: formData.nombre,
        descripcion: formData.descripcion || undefined,
        categoria: formData.categoria,
        precio: Number(formData.precio),
        cantidad: Number(formData.cantidad),
        imagenUrl: formData.imagenUrl || undefined,
      });
      setShowForm(false);
      setFormData({
        nombre: '',
        descripcion: '',
        categoria: '',
        precio: '',
        cantidad: '',
        imagenUrl: '',
      });
      loadProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error al crear producto');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await productsService.delete(id);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar producto');
    }
  };

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="farmer-products-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="product-form">
          <h2>Nuevo Producto</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre *</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Categoría *</label>
              <input
                type="text"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows={3}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Precio *</label>
              <input
                type="number"
                step="0.01"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Cantidad *</label>
              <input
                type="number"
                value={formData.cantidad}
                onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>URL de Imagen</label>
            <input
              type="url"
              value={formData.imagenUrl}
              onChange={(e) => setFormData({ ...formData, imagenUrl: e.target.value })}
            />
          </div>
          <button type="submit" className="submit-btn">
            Crear Producto
          </button>
          <button type="button" onClick={() => setShowForm(false)} className="edit-btn" style={{ marginTop: '1rem' }}>
            Cancelar
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando productos...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty">No tienes productos</div>
      ) : (
        <>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.imagenUrl ? (
                  <img src={product.imagenUrl} alt={product.nombre} className="product-image" />
                ) : (
                  <div className="product-image" style={{ background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                    🍎
                  </div>
                )}
                <div className="product-info">
                  <h3>{product.nombre}</h3>
                  <p className="product-details">Cantidad disponible: {product.cantidad} unidades</p>
                  <p className="product-price">precio unidad: {product.precio} pesos</p>
                  <button className="edit-btn">Editar</button>
                </div>
              </div>
            ))}
          </div>
          <div className="add-product-footer">
            <button onClick={() => setShowForm(!showForm)} className="add-product-btn">
              Agregar producto
            </button>
          </div>
        </>
      )}
    </div>
  );
};

