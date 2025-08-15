import { PRICE_DATA } from '../../data/priceDataWorkingDate.ts';
import { createPriceMap } from './createPriceMap.ts';
const getPriceValues = (
  fiscalYear: string,
  region: string,
  selectedTariff: string,
) => {
  const priceValuesRegion = PRICE_DATA.filter(
    (item) =>
      item.fiscalYear === fiscalYear &&
      item.region === region &&
      item.tariffName === selectedTariff,
  );

  const priceValuesNoneRegion = PRICE_DATA.filter(
    (item) =>
      (item.fiscalYear === fiscalYear && item.region === 'none') ||
      (item.fiscalYear === fiscalYear &&
        item.region === 'none' &&
        item.tariffName === selectedTariff),
  );

  return {
    regionPriceMap: createPriceMap(priceValuesRegion),
    nonRegionPriceMap: createPriceMap(priceValuesNoneRegion),
  };
};

export { getPriceValues };
