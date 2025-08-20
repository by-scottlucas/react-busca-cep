import './AddressCard.css';

import { MapPin } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import AddressMap from '../AddressMap/AddressMap';

export default function AddressCard({ cepData }) {
  const [addressNumberInput, setAddressNumberInput] = useState("");
  const [addressNumber, setAddressNumber] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setAddressNumber(addressNumberInput.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [addressNumberInput]);

  if (!cepData) return null;

  const addressFields = [
    { label: "CEP", value: cepData.cep },
    { label: "Logradouro", value: cepData.logradouro },
    { label: "Bairro", value: cepData.bairro },
    { label: "Cidade", value: cepData.localidade },
    { label: "Estado", value: cepData.uf },
  ];

  if (cepData.complemento) {
    addressFields.push({
      label: "Complemento",
      value: cepData.complemento,
    });
  }

  return (
    <section className="address-card">
      <div className="address-card__header">
        <MapPin size={28} className="text-blue-600" />
        <span className="address-card__header--label">Endereço Encontrado</span>
      </div>

      <div className="address-card__infos">
        {addressFields.map(({ label, value }) => (
          <span key={label} className="address-card__info">
            <p className="address-card__label">{label}</p>
            <p className="address-card__value">{value}</p>
          </span>
        ))}

        <div className="address-card__number-input">
          <label className="address-card__label">Número (Opcional)</label>
          <input
            type="text"
            placeholder="Ex.: 123, 45A, S/N"
            className="address-card__input"
            value={addressNumberInput}
            onChange={(e) => setAddressNumberInput(e.target.value)}
          />
          <span className="address-card__hint">
            Adicione o número para uma localização mais precisa.
          </span>
        </div>
      </div>

      <AddressMap 
        address={cepData} 
        coordinates={cepData.coordinates} 
        addressNumber={addressNumber} 
      />
    </section>
  );
}

AddressCard.propTypes = {
  cepData: PropTypes.shape({
    cep: PropTypes.string.isRequired,
    logradouro: PropTypes.string,
    bairro: PropTypes.string,
    localidade: PropTypes.string,
    uf: PropTypes.string,
    complemento: PropTypes.string,
    coordinates: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }).isRequired,
};