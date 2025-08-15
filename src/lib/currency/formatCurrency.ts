const formatCurrency = (value: number): string => {
  const currencyStr = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value);

  if (currencyStr === '£NaN') return '£0';

  return currencyStr;
};

export { formatCurrency };
