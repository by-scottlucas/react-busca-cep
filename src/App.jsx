import './App.css';

import { useEffect, useState } from 'react';

import AddressCard from './components/AddressCard/AddressCard';
import Loading from './components/Loading/Loading';
import SearchBar from './components/SearchBar/SearchBar';
import Toast from './components/Toast/Toast';
import { useLocationByCep } from './hooks/useLocationByCep';
import { formatCep } from './utils/cepUtils';

export default function App() {
  const [cepInput, setCepInput] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const { cepData, error, loading, fetchCepData } = useLocationByCep();

  const handleInputChange = (event) => {
    setCepInput(formatCep(event.target.value));
  };

  const handleSearch = () => {
    if (!cepInput) {
      setToastMessage("Por favor, preencha um CEP válido");
      return;
    }
    setToastMessage("");
    fetchCepData(cepInput);
  };

  const handleCloseToast = () => {
    setToastMessage("");
  };

  useEffect(() => {
    if (error) {
      setToastMessage(error);
    }
  }, [error]);

  return (
    <main className="app-container">
      <SearchBar
        cep={cepInput}
        onCepChange={handleInputChange}
        onSearch={handleSearch}
      />

      {loading && (
        <div className="mt-36">
          <Loading />
        </div>
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={handleCloseToast}
        />
      )}

      {cepData && !loading &&
        <AddressCard cepData={cepData} />
      }
    </main>
  );
}