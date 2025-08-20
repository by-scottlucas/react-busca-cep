import './App.css';

import { useState } from 'react';

import AddressCard from './components/AddressCard/AddressCard';
import Modal from './components/Modal/Modal';
import SearchBar from './components/SearchBar/SearchBar';
import addressService from './services/addressService';

export default function App() {
  const [cepInput, setCepInput] = useState("");
  const [cepData, setCepData] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const formatCep = (value) => {
    const onlyNumbers = value.replace(/\D/g, "");
    return onlyNumbers.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const getCoordinatesFromAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error);
      return null;
    }
  };

  const handleSearch = async () => {
    if (!cepInput) {
      setModalMessage("Por favor, preencha um CEP válido");
      setShowModal(true);
      return;
    }

    try {
      const data = await addressService.fetchAddressByCep(cepInput);

      if (data.erro) {
        setModalMessage("CEP não encontrado");
        setShowModal(true);
        return;
      }

      const addressString = `${data.logradouro || ""}, ${data.bairro || ""}, ${data.localidade || ""} - ${data.uf}, ${data.cep}`;
      const coordinates = await getCoordinatesFromAddress(addressString);

      setCepData({
        ...data,
        coordinates,
      });

      setCepInput("");
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      setModalMessage("Erro ao buscar o CEP");
      setShowModal(true);
    }
  };

  const handleInputChange = (event) => {
    setCepInput(formatCep(event.target.value));
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <main className="app-container">
      <SearchBar
        cep={cepInput}
        onSearch={handleSearch}
        onCepChange={handleInputChange}
      />

      {cepData && (
        <AddressCard cepData={cepData} />
      )}

      <Modal show={showModal}>
        <h3>{modalMessage}</h3>
        <button onClick={closeModal}>OK</button>
      </Modal>
    </main>
  );
}
