export interface CalculatorValues {
  selectedYear: string;
  selectedRegion: string;
  selectedTariff: string;
  volumeMwh: string;
  volumeKw: string;
}

export interface CalculatorTotals {
  systemTotal: number;
  systemPercentage: number;
  policyTotal: number;
  policyPercentage: number;
  networkTotal: number;
  networkPercentage: number;
}
export interface CalculatorYearlyResults {
  fiscalYear: string;
  totals: CalculatorTotals;
}
