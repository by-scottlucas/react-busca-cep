import './Map.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
<<<<<<< HEAD
import { useEffect } from 'react';

export default function Map({ cep }) {
  useEffect(() => {
    const map = L.map('map').setView([-24.0058, -46.4025], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
=======
import { useEffect, useState } from 'react';

import Modal from '../Modal/Modal';

export default function Map({ cep }) {
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const map = L.map("map").setView([-24.0058, -46.4025], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
>>>>>>> 3f872e7 (Update LICENCE)
      maxZoom: 20,
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      className: "custom-marker",
    });

    let marker = null;

<<<<<<< HEAD
    function buscarEnderecoPorCEP() {
=======
    function searchAddressByCep() {
>>>>>>> 3f872e7 (Update LICENCE)
      const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`;
      console.log("ViaCEP URL:", viaCepUrl);

      fetch(viaCepUrl)
<<<<<<< HEAD
        .then(response => response.json())
        .then(data => {
          console.log('Resposta do ViaCEP:', data);
=======
        .then((response) => response.json())
        .then((data) => {
          console.log("ViaCEP response:", data);

>>>>>>> 3f872e7 (Update LICENCE)
          if (!data.erro) {
            const address = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            searchCoordinatesByAddress(address);
          } else {
<<<<<<< HEAD
            alert('CEP não encontrado.');
          }
        })
        .catch(error => {
          console.error('Erro ao buscar endereço pelo CEP:', error);
          console.log('Ocorreu um erro ao buscar o endereço.');
        });
    }

    function buscarCoordenadasPorEndereco(endereco) {
      var apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            var coordenadas = {
=======
            setModalMessage("CEP não encontrado.");
            setShowModal(true);
          }
        })
        .catch((error) => {
          console.error("Error searching address by CEP:", error);
          setModalMessage("Ocorreu um erro ao buscar o endereço.");
          setShowModal(true);
        });
    }

    function searchCoordinatesByAddress(address) {
      const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const coordinates = {
>>>>>>> 3f872e7 (Update LICENCE)
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon),
            };
<<<<<<< HEAD
            adicionarMarcador(coordenadas);
            centralizarMapa(coordenadas.latitude, coordenadas.longitude);
          } else {
            console.log('Endereço não encontrado.');
          }
        })
        .catch(error => {
          console.error('Erro ao buscar coordenadas:', error);
          console.log('Ocorreu um erro ao buscar as coordenadas. Verifique a conexão ou tente novamente mais tarde.');
=======

            addMarker(coordinates);
            centerMap(coordinates.latitude, coordinates.longitude);
          } else {
            setModalMessage("Endereço não encontrado.");
            setShowModal(true);
          }
        })
        .catch((error) => {
          console.error("Error searching coordinates:", error);
          setModalMessage("Ocorreu um erro ao buscar as coordenadas.");
>>>>>>> 3f872e7 (Update LICENCE)
        });
    }

    function centerMap(latitude, longitude) {
      map.setView([latitude, longitude], 18);
    }

    function addMarker(coordinates) {
      if (marker) {
        map.removeLayer(marker);
      }
      marker = L.marker([coordinates.latitude, coordinates.longitude], {
        icon: customIcon,
      }).addTo(map);
    }

    if (cep) {
      searchAddressByCep();
    }

    return () => {
      map.remove();
    };
  }, [cep]);

<<<<<<< HEAD
  return (
    <div className="main">
      <div id="map" className="map-container"></div>
=======
  function closeModal() {
    setShowModal(false);
    setModalMessage("");
  }

  return (
    <div className="main">
      <div id="map" className="map-container"></div>

      <Modal show={showModal}>
        <h3>{modalMessage}</h3>
        <button onClick={closeModal}>OK</button>
      </Modal>
>>>>>>> 3f872e7 (Update LICENCE)
    </div>
  );
}
