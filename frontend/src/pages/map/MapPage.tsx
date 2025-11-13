import './MapPage.css';

export const MapPage = () => {
  return (
    <div className="map-page">
      <h1>Mapa de Productos</h1>
      <div className="map-container">
        <div className="map-placeholder">
          <p>🗺️ Mapa interactivo</p>
          <p className="map-note">
            Aquí se mostrará un mapa con la ubicación de los productos y agricultores.
            Integración con Google Maps o similar.
          </p>
        </div>
      </div>
    </div>
  );
};

