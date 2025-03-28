export const validateTelephone = (telephone: string): boolean => {
  const phoneRegex = /^\+?55\s?\(?\d{2}\)?\s?9\d{4}-?\d{4}$/;
  return phoneRegex.test(telephone);
};