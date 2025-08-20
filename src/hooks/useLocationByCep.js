import { useState } from 'react';

import { fetchAddressByCep, fetchCoordinatesByAddress } from '../services/addressService';

export function useLocationByCep() {
  const [cepData, setCepData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCepData = async (cepInput) => {
    const cleanCep = cepInput.replace(/\D/g, "");
    if (cleanCep.length !== 8) {
      setError("Por favor, insira um CEP válido.");
      setCepData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const addressData = await fetchAddressByCep(cleanCep);

      if (addressData.erro) {
        setError("CEP não encontrado.");
        setCepData(null);
        return;
      }

      const addressString = `${addressData.logradouro}, ${addressData.bairro}, ${addressData.localidade} - ${addressData.uf}`;
      const coordsData = await fetchCoordinatesByAddress(addressString);

      const coordinates =
        coordsData.length > 0
          ? { lat: parseFloat(coordsData[0].lat), lng: parseFloat(coordsData[0].lon) }
          : null;

      setCepData({ ...addressData, coordinates });
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar informações.");
      setCepData(null);
    } finally {
      setLoading(false);
    }
  };

  return { cepData, error, loading, fetchCepData };
}
