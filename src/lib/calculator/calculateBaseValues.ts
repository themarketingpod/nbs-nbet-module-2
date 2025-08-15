import { CalculatorValues } from '../../types/calculator.ts';

const calculateBaseValues = (calcState: CalculatorValues) => {
  let gbpMwhPeak = 0;
  let pkVaDay = 0;

  const pDay = 3.65;

  const volumeMwh = parseFloat(calcState.volumeMwh) || 0;
  const volumeKw = parseFloat(calcState.volumeKw) || 0;

  if (calcState.selectedTariff === 'ehv' || calcState.selectedTariff === 'hv') {
    gbpMwhPeak = volumeMwh * 0.05;
    pkVaDay = (volumeKw * 365) / 100;
  } else if (calcState.selectedTariff === 'lv') {
    gbpMwhPeak = 0.5;
  }

  return { gbpMwhPeak, pkVaDay, pDay };
};

export { calculateBaseValues };
