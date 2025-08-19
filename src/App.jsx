import './App.css';

import { useState } from 'react';

import AddressCard from './components/AddressCard/AddressCard';
import SearchBar from './components/SearchBar/SearchBar';
import Modal from './components/Modal/Modal';
import addressService from './services/addressService';

export default function App() {
  const [input, setInput] = useState("");
  const [cepData, setCepData] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const formatCep = (value) => {
    const onlyNumbers = value.replace(/\D/g, "");
    return onlyNumbers.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const handleSearch = async () => {
    if (!input) {
      setModalMessage("Por favor, preencha um CEP válido");
      setShowModal(true);
      return;
    }

    try {
      const data = await addressService.fetchAddressByCep(input);

      if (data.erro) {
        setModalMessage("CEP não encontrado");
        setShowModal(true);
        return;
      }

      setCepData(data);
      setInput("");
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      setModalMessage("Erro ao buscar o CEP");
      setShowModal(true);
    }
  };

  const handleInputChange = (event) => {
    setInput(formatCep(event.target.value));
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <main className="app-container">
      <SearchBar
        cep={input}
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