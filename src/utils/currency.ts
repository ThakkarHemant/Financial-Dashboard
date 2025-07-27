export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (amount: number): string => {
  return new Intl.NumberFormat('en-IN').format(amount);
};

export const calculateVariance = (actual: number, budget: number): { amount: number; percentage: number; isPositive: boolean } => {
  const amount = actual - budget;
  const percentage = budget !== 0 ? (amount / budget) * 100 : 0;
  return {
    amount,
    percentage,
    isPositive: amount >= 0
  };
};