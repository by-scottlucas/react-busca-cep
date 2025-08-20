import './AddressMap.css';

import { ExternalLink, Navigation } from 'lucide-react';
import PropTypes from 'prop-types';

import { getDirectionsUrl, getEmbedUrl, getPlaceUrl } from './utils/addressMapHelpers';

export default function AddressMap({ coordinates, address, addressNumber }) {
  const handleOpen = (url) => {
    if (url && url !== "#") window.open(url, "_blank");
  };

  return (
    <div className="map">
      <div className="map__actions">
        <button
          onClick={() => handleOpen(getDirectionsUrl(address, addressNumber, coordinates))}
          className="map__button map__button--secondary"
        >
          <Navigation className="map__icon" />
          Como Chegar
        </button>
        <button
          onClick={() => handleOpen(getPlaceUrl(address, addressNumber, coordinates))}
          className="map__button map__button--primary"
        >
          <ExternalLink className="map__icon" />
          Ver no Maps
        </button>
      </div>

      <div className="map__frame">
        <iframe
          src={getEmbedUrl(address, addressNumber, coordinates)}
          className="map__iframe"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

AddressMap.propTypes = {
  coordinates: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  address: PropTypes.shape({
    logradouro: PropTypes.string,
    bairro: PropTypes.string,
    localidade: PropTypes.string,
    uf: PropTypes.string,
    cep: PropTypes.string,
  }),
  addressNumber: PropTypes.string,
};