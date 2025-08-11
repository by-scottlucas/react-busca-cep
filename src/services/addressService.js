import axios from "axios";

const viaCepApi = axios.create({
  baseURL: "https://viacep.com.br/ws/"
});

async function fetchAddressByCep(cep) {
  const { data } = await viaCepApi.get(`${cep}/json/`);
  return data;
}

async function fetchCoordinatesByAddress(address) {
  const { data } = await axios.get(`https://nominatim.openstreetmap.org/search`, {
    params: {
      format: "json",
      q: address
    }
  });
  return data;
}

export default {
  fetchAddressByCep,
  fetchCoordinatesByAddress
};
