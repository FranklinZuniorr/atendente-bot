export const validateTelephone = (telephone: string): boolean => {
  const phoneRegex = /^\+?55\s?\(?\d{2}\)?\s?9\d{4}-?\d{4}$/;
  return phoneRegex.test(telephone);
};

export const formatTelephone = (text: string) => {
  text = String(text).replace(/\D/g, '');
  text = text.slice(0, 11);
  return text.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};