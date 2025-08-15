import { calculateBaseValues } from './calculateBaseValues.ts';
import { calculateYear } from './calculateYear.ts';
import { getPriceValues } from './getPriceValues.ts';

import {
  CalculatorValues,
  CalculatorYearlyResults,
} from '../../types/calculator.ts';

const calculator = (calcState: CalculatorValues): CalculatorYearlyResults[] => {
  const baseValues = calculateBaseValues(calcState);
  const startYear = new Date().getFullYear();
  const endYear = startYear + 5;

  const results: CalculatorYearlyResults[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const fiscalYear = `${year}-${year + 1}`;

    const priceMaps = getPriceValues(
      fiscalYear,
      calcState.selectedRegion,
      calcState.selectedTariff,
    );

    const yearlyTotals = calculateYear(baseValues, calcState, priceMaps);

    results.push({
      fiscalYear,
      totals: yearlyTotals,
    });
  }

  return results;
};

export { calculator };
