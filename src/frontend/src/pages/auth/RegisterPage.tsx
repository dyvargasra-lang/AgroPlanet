import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './Auth.css';

export const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<'FARMER' | 'BUYER'>('BUYER');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await register({ nombre, email, password, rol });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al registrarse');
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
          <h2>Registro</h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <input
                type="text"
                id="nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
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
                minLength={8}
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <select
                id="rol"
                value={rol}
                onChange={(e) => setRol(e.target.value as 'FARMER' | 'BUYER')}
                disabled={isLoading}
                style={{ padding: '0.75rem', border: '2px solid black', borderRadius: '12px', fontSize: '1rem' }}
              >
                <option value="BUYER">Comprador</option>
                <option value="FARMER">Agricultor</option>
              </select>
            </div>
            <div className="auth-buttons">
              <button type="submit" disabled={isLoading} className="submit-btn">
                {isLoading ? 'Cargando...' : 'Crear cuenta'}
              </button>
              <Link to="/login" className="auth-action-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
                Iniciar sesion
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

