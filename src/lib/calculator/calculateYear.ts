import { CalculatorValues } from '../../types/calculator.ts';

const calculateYear = (baseValues, calcState: CalculatorValues, priceMaps) => {
  const { nonRegionPriceMap, regionPriceMap } = priceMaps;
  const { volumeMwh } = calcState;
  const volumeMwhFloat = parseFloat(volumeMwh);
  // console.table(baseValues);

  // None Region Values
  const unitPeakSystem =
    (nonRegionPriceMap['unit-peak-system-none'] ?? 0) * baseValues.gbpMwhPeak;

  const unitNetwork =
    (nonRegionPriceMap['unit-network-none'] ?? 0) * volumeMwhFloat;
  const unitPolicy =
    (nonRegionPriceMap['unit-policy-none'] ?? 0) * volumeMwhFloat;
  const unitSystem =
    (nonRegionPriceMap['unit-system-none'] ?? 0) * volumeMwhFloat;

  // Region Values
  const unitRegion =
    (regionPriceMap[`unit-network-${calcState.selectedTariff}`] ?? 0) *
    volumeMwhFloat;
  const standingPKVADayRegion =
    (regionPriceMap[`standing-p-kva-day-network-${calcState.selectedTariff}`] ??
      0) * baseValues.pkVaDay;
  const standingPDayRegion =
    (regionPriceMap[`standing-p-day-network-${calcState.selectedTariff}`] ??
      0) * baseValues.pDay;
  const standingGbpYearRegion =
    (regionPriceMap[`standing-gbp-year-network-${calcState.selectedTariff}`] ??
      0) * 0;
  const standingGbpKwRegion = 0;
  const standingGbpYearTariff =
    (nonRegionPriceMap[
      `standing-gbp-year-network-${calcState.selectedTariff}`
    ] ?? 0) * 1;

  // Cost Family Total Values
  const systemTotal = unitPeakSystem + unitSystem;
  const policyTotal = unitPolicy;
  const networkTotal =
    unitNetwork +
    unitRegion +
    standingPKVADayRegion +
    standingPDayRegion +
    standingGbpYearRegion +
    standingGbpKwRegion +
    standingGbpYearTariff;

  const total = systemTotal + policyTotal + networkTotal;

  let systemPercentage = 0;
  let policyPercentage = 0;
  let networkPercentage = 0;

  if (total > 0) {
    systemPercentage = (systemTotal / total) * 100;
    policyPercentage = (policyTotal / total) * 100;
    networkPercentage = (networkTotal / total) * 100;
  }

  return {
    systemTotal,
    systemPercentage,
    policyTotal,
    policyPercentage,
    networkTotal,
    networkPercentage,
    total,
  };
};

export { calculateYear };
