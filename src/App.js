import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import './styles.css';
export default function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {

    if (input === '') {
      alert("Preencha com algum CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");

    } catch {
      alert("Erro ao buscar o CEP");
      setInput("");
    }
  }

  return (
    <div className="container">

      <h1 className="title">Busca CEP</h1>

      <div className="container-input">
        <input type="text" placeholder="Digite o CEP..." value={input} onChange={(e) => setInput(e.target.value)} />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#000000' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (

        <main className='main'>
          <h2>{cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento:{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>

      )}


    </div>
  );
}