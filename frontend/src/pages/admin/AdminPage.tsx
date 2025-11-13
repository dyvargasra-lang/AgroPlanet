import './AdminPage.css';

export const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Panel de Administración</h1>
      <div className="admin-content">
        <div className="admin-card">
          <h3>Usuarios</h3>
          <p>Gestión de usuarios del sistema</p>
        </div>
        <div className="admin-card">
          <h3>Productos</h3>
          <p>Gestión de todos los productos</p>
        </div>
        <div className="admin-card">
          <h3>Pedidos</h3>
          <p>Gestión de todos los pedidos</p>
        </div>
        <div className="admin-card">
          <h3>Auditoría</h3>
          <p>Registros de auditoría del sistema</p>
        </div>
      </div>
    </div>
  );
};

