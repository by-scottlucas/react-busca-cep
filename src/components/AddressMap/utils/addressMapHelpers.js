export const formatAddress = (address, streetNumber) => {
  if (!address) return "";
  return [
    streetNumber ? `${address.logradouro}, ${streetNumber}` : address.logradouro,
    address.bairro,
    address.localidade,
    address.uf,
    address.cep,
  ].filter(Boolean).join(", ");
};

export const getPlaceUrl = (address, streetNumber, coordinates) => {
  if (address?.logradouro) {
    return `https://www.google.com/maps/place/${encodeURIComponent(
      formatAddress(address, streetNumber)
    )}`;
  }
  if (coordinates?.lat && coordinates?.lng) {
    return `https://www.google.com/maps/place/${coordinates.lat},${coordinates.lng}`;
  }
  return "#";
};

export const getDirectionsUrl = (address, streetNumber, coordinates) => {
  const destination = address
    ? formatAddress(address, streetNumber)
    : coordinates?.lat && coordinates?.lng
      ? `${coordinates.lat},${coordinates.lng}`
      : "";
  return `https://www.google.com/maps/dir//${encodeURIComponent(destination)}`;
};

export const getEmbedUrl = (address, streetNumber, coordinates) => {
  const query = address
    ? formatAddress(address, streetNumber)
    : coordinates?.lat && coordinates?.lng
      ? `${coordinates.lat},${coordinates.lng}`
      : "";
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
};