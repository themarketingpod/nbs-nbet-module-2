const maxYear = 2036;
const startYear = 2022;

const getYearsForDropdown = () => {
  const today = new Date().getFullYear();
  const startYear = today - 2;
  const endYear = today + 4;

  const yearRange: { value: string; label: string }[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const nextYear = year + 1;
    const yearOption = {
      label: `${year}-${nextYear}`,
      value: `${year}-${nextYear}`,
    };

    yearRange.push(yearOption);
  }

  return yearRange;
};

export { getYearsForDropdown };
