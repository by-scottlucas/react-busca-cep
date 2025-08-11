import './Map.css';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { useEffect } from 'react';

import { useLocationByCep } from '../../hooks/useLocationByCep';
import Modal from '../Modal/Modal';

export default function Map({ cep }) {

  const { coordinates, error, loading } = useLocationByCep(cep);

  useEffect(() => {
    if (!coordinates) return;

    const map = L.map("map").setView([coordinates.latitude, coordinates.longitude], 18);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      className: "custom-marker",
    });

    L.marker([coordinates.latitude, coordinates.longitude], { icon: customIcon }).addTo(map);

    return () => map.remove();
  }, [coordinates]);

  return (
    <div className="main">
      {loading && (
        <div className="map-container">
          <p className="message-loading">
            Carregando Mapa...
          </p>
        </div>
      )}

      {coordinates &&
        <div id="map" className="map-container"></div>
      }

      <Modal show={!!error}>
        <h3>{error}</h3>
        <button onClick={() => window.location.reload()}>OK</button>
      </Modal>
    </div>
  );
}