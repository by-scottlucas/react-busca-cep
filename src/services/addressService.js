import axios from 'axios';

const viaCepApi = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  timeout: 5000,
});

const nominatimApi = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
  timeout: 5000,
});

export async function fetchAddressByCep(cep) {
  try {
    const { data } = await viaCepApi.get(`${cep}/json/`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    throw new Error("Falha ao buscar endereço pelo CEP.");
  }
}

export async function fetchCoordinatesByAddress(address) {
  try {
    const { data } = await nominatimApi.get("/search", {
      params: { format: "json", q: address, limit: 1 },
    });
    return data;
  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error);
    throw new Error("Falha ao buscar coordenadas do endereço.");
  }
}
