import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './Layout.css';

export const Layout = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            🌱 AgroPlanet
          </Link>
          <nav className="nav">
            <Link to="/products">Productos</Link>
            {user.rol === 'FARMER' || user.rol === 'ADMIN' ? (
              <>
                <Link to="/farmer/products">Mis Productos</Link>
                <Link to="/farmer/orders">Mis Pedidos</Link>
              </>
            ) : (
              <Link to="/orders">Mis Pedidos</Link>
            )}
            <Link to="/chat">Chat</Link>
            <Link to="/map">Mapa</Link>
            {user.rol === 'ADMIN' && <Link to="/admin">Admin</Link>}
            <span className="user-name">{user.nombre}</span>
            <button onClick={handleLogout} className="logout-btn">
              Salir
            </button>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

