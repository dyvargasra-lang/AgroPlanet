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

  const getRoleLabel = () => {
    if (user.rol === 'FARMER') return 'Agricultor';
    if (user.rol === 'BUYER') return 'Comprador';
    return 'Admin';
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="menu-icon">⋮</div>
          <div className="header-title">
            <div className="header-role">{getRoleLabel()}</div>
            <div className="header-name">{user.nombre}</div>
          </div>
          <Link to="/chat" className="chat-icon">
            <div className="chat-label">Chat</div>
            <div className="chat-bubble">💬</div>
          </Link>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

