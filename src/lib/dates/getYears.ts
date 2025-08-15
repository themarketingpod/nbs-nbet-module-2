const getYears = (): number[] => {
  const startYear = new Date().getFullYear();
  const endYear = startYear + 5;

  const years: number[] = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  return years;
};

export { getYears };
