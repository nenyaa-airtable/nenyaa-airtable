export const getNumbers = (str: string): string => {
  return Number.isFinite(str) ? String(str) : str?.replace(/\D/g, '');
};

export const isNullOrWhitespace = (str: string): boolean => {
  return !str || !String(str).trim();
};
