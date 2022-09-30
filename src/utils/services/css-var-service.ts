export const setCSSVar = (name: string, value: string): void => {
  document.documentElement.style.setProperty(`--${name}`, value);
};

export const getCSSVar = (name: string, fallback?: string): string => {
  const fb = fallback ? `, ${fallback}` : "";
  return `var(--${name}${fb})`;
};
