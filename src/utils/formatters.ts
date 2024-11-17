export const formatCurrency = (value: number): string => {
  const formatted = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
  
  const inMillions = (value / 1000000).toFixed(1);
  return `${formatted} (${inMillions}M)`;
};