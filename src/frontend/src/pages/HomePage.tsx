import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './HomePage.css';

export const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Bienvenido a AgroPlanet</h1>
        <p className="subtitle">Plataforma de gestión agrícola</p>
        {user && <p className="user-greeting">Hola, {user.nombre} ({user.rol})</p>}
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>🌾 Productos</h3>
          <p>Explora y gestiona productos agrícolas</p>
          <Link to="/products" className="feature-link">
            Ver Productos →
          </Link>
        </div>

        {user?.rol === 'FARMER' || user?.rol === 'ADMIN' ? (
          <div className="feature-card">
            <h3>📦 Mis Productos</h3>
            <p>Gestiona tus productos agrícolas</p>
            <Link to="/farmer/products" className="feature-link">
              Gestionar →
            </Link>
          </div>
        ) : (
          <div className="feature-card">
            <h3>🛒 Mis Pedidos</h3>
            <p>Revisa el estado de tus pedidos</p>
            <Link to="/orders" className="feature-link">
              Ver Pedidos →
            </Link>
          </div>
        )}

        <div className="feature-card">
          <h3>💬 Chat</h3>
          <p>Comunícate con agricultores y compradores</p>
          <Link to="/chat" className="feature-link">
            Ir al Chat →
          </Link>
        </div>

        <div className="feature-card">
          <h3>🗺️ Mapa</h3>
          <p>Visualiza ubicaciones de productos</p>
          <Link to="/map" className="feature-link">
            Ver Mapa →
          </Link>
        </div>
      </div>
    </div>
  );
};

