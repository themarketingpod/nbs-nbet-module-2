interface GetDatesReturn {
  startYear: number;
  nextYear: number;
  fiveYearsInFuture: number;
  endYear: number;
}

const getDates = (): GetDatesReturn => {
  // Start Dates
  const startYear = new Date().getFullYear();
  const nextYear = startYear + 1;

  // End Dates
  const fiveYearsInFuture = startYear + 5;
  const endYear = fiveYearsInFuture + 1;

  return {
    startYear,
    nextYear,
    fiveYearsInFuture,
    endYear,
  };
};

export { getDates };
