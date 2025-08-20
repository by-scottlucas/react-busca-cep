export const formatCep = (value) => {
  const onlyNumbers = value.replace(/\D/g, "");
  return onlyNumbers.replace(/(\d{5})(\d{3})/, "$1-$2");
};