import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import './Map.css';
import Modal from '../Modal/Modal';

export default function Map({ cep }) {
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (!cep) return;

    async function fetchAddress() {
      try {
        const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`;
        const response = await fetch(viaCepUrl);
        const data = await response.json();

        if (data.erro) {
          setModalMessage('CEP não encontrado.');
          setShowModal(true);
          return;
        }

        const address = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        fetchCoordinates(address);
      } catch (error) {
        console.error('Erro ao buscar o endereço:', error);
        setModalMessage('Erro ao buscar o endereço.');
        setShowModal(true);
      }
    }

    async function fetchCoordinates(address) {
      try {
        const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length === 0) {
          setModalMessage('Endereço não encontrado.');
          setShowModal(true);
          return;
        }

        setCoordinates({
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        });
      } catch (error) {
        console.error('Erro ao buscar coordenadas:', error);
        setModalMessage('Erro ao buscar coordenadas.');
        setShowModal(true);
      }
    }

    fetchAddress();
  }, [cep]);

  useEffect(() => {
    if (!coordinates) return;

    const map = L.map('map').setView([coordinates.latitude, coordinates.longitude], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      className: 'custom-marker',
    });

    L.marker([coordinates.latitude, coordinates.longitude], { icon: customIcon }).addTo(map);

    return () => {
      map.remove();
    };
  }, [coordinates]);

  function closeModal() {
    setShowModal(false);
    setModalMessage('');
  }

  return (
    <div className="main">
      {coordinates ?
        <div id="map" className="map-container"></div> :
        <div className="map-container">
          <p className='message-loading'>Carregando Mapa. . .</p>
        </div>
      }
      <Modal show={showModal}>
        <h3>{modalMessage}</h3>
        <button onClick={closeModal}>OK</button>
      </Modal>
    </div>
  );
}
