import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './Auth.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>Bienvenidos</h1>
        <div className="logo-letter">A</div>
        <div className="logo-text">AgroPlanet</div>
        <div className="auth-logo"></div>
      </div>
      <div className="auth-form-section">
        <div className="auth-card">
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                placeholder="contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="auth-buttons">
              <button type="submit" disabled={isLoading} className="submit-btn">
                {isLoading ? 'Cargando...' : 'iniciar sesion'}
              </button>
              <Link to="/register" className="auth-action-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
                Crear cuenta
              </Link>
              <button type="button" className="auth-action-btn" onClick={() => navigate('/')}>
                Ingresar sin usuario
              </button>
            </div>
            <p className="auth-link">
              he olvidado mi contraseña
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

