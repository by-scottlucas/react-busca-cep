import { useState, useEffect } from "react";
import addressService from "../services/addressService";

export function useLocationByCep(cep) {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cep) return;

    async function getLocation() {
      setLoading(true);
      setError(null);

      try {
        const addressData = await addressService.fetchAddressByCep(cep);

        if (addressData.erro) {
          setError("CEP não encontrado.");
          return;
        }

        const address = `${addressData.logradouro}, ${addressData.bairro}, ${addressData.localidade} - ${addressData.uf}`;
        const coordsData = await addressService.fetchCoordinatesByAddress(address);

        if (coordsData.length === 0) {
          setError("Endereço não encontrado.");
          return;
        }

        setCoordinates({
          latitude: parseFloat(coordsData[0].lat),
          longitude: parseFloat(coordsData[0].lon),
        });
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar informações.");
      } finally {
        setLoading(false);
      }
    }

    getLocation();
  }, [cep]);

  return { coordinates, error, loading };
}
