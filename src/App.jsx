import './App.css';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import logo from './assets/logo.png';
import Map from './components/Map/Map';
import Modal from './components/Modal/Modal';
import cepService from './services/cep.service';

export default function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const formatCep = (value) => {
    const formattedCep = value.replace(/\D/g, "");
    return formattedCep.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const handleSearch = async () => {
    if (!input) {
      setModalMessage("Por favor, preencha um CEP válido");
      setShowModal(true);
      return;
    }

    try {
      const response = await cepService.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      setModalMessage("Erro ao buscar o CEP");
      setShowModal(true);
      setInput("");
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  const handleInputChange = (event) => {
    const maskedCep = formatCep(event.target.value);
    setInput(maskedCep);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <main className="container">
      <img src={logo} alt="Logo" className="logo" />

      <section className="input-box">
        <input
          type="text"
          placeholder="Digite o CEP..."
          value={input}
          onChange={handleInputChange}
        />
        <button className="search-btn" onClick={handleSearch}>
          <FiSearch className="icon-search" />
        </button>
      </section>

      {Object.keys(cep).length > 0 && (
        <section className="result-box">
          <h2 className="result-cep">{cep.cep}</h2>

          <div className="result-info">
            <span className="box-info">
              <p className="label">Logradouro</p>
              <p className="sub-label">{cep.logradouro}</p>
            </span>

            <span className="box-info">
              <p className="label">Bairro</p>
              <p className="sub-label">{cep.bairro}</p>
            </span>

            <span className="box-info">
              <p className="label">Localidade/UF</p>
              <p className="sub-label">
                {cep.localidade}/{cep.uf}
              </p>
            </span>

            {cep.complemento && (
              <span className="complemento">
                <p className="label">Complemento</p>
                <p className="sub-label">{cep.complemento}</p>
              </span>
            )}
          </div>

          <Map cep={cep.cep} />
        </section>
      )}

      <Modal show={showModal}>
        <h3>{modalMessage}</h3>
        <button onClick={closeModal}>OK</button>
      </Modal>
    </main>
  );
}
