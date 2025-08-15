const createPriceMap = (priceData) => {
  return priceData.reduce((map, item) => {
    const key = `${item.type}${item.costFamily ? `-${item.costFamily}` : ''}-${
      item.tariffName
    }`;
    map[key] = item.cost;

    return map;
  }, {});
};

export { createPriceMap };
