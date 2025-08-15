import { useMemo } from 'react';
import { CalculatorYearlyResults } from '../../../types/calculator.ts';
import { Card } from '../../ui/card/card.tsx';

import { formatCurrency } from '../../../lib/currency/formatCurrency.ts';

import styles from './charges.module.css';

interface ChargesProps {
  results: CalculatorYearlyResults[];
}

const Charges = ({ results }) => {
  const chargeValues = useMemo(() => {
    // Add a safety check in case the results array is empty
    if (!results || results.length === 0) {
      return {
        grandTotal: 0,
        currentYearTotal: 0,
        percentageIncrease: 0,
      };
    }

    // Get the first and last year's data from the array
    const firstYearData = results[0];
    const lastYearData = results[results.length - 1];

    const firstYearTotal = firstYearData.totals.total;
    const lastYearTotal = lastYearData.totals.total;

    // Calculate the percentage increase
    let percentageIncrease = 0;
    // Check if firstYearTotal is not zero to avoid division errors
    if (firstYearTotal > 0) {
      percentageIncrease =
        ((lastYearTotal - firstYearTotal) / firstYearTotal) * 100;
    }

    // Calculate the grand total for all years
    const grandTotal = results.reduce(
      (sum, year) => sum + year.totals.total,
      0,
    );

    return {
      grandTotal: grandTotal,
      currentYearTotal: firstYearTotal,
      percentageIncrease: percentageIncrease,
    };
  }, [results]);

  const handleImpactValue = (value: number) => {
    let label: string = '';
    let className: string = '';

    if (value <= 500000) {
      (label = 'low'), (className = styles['impact-low']);
    } else if (value > 500000 && value <= 1500000) {
      (label = 'medium'), (className = styles['impact-medium']);
    } else if (value > 1500000) {
      (label = 'high'), (className = styles['impact-high']);
    } else {
      return null;
    }

    return { label, className };
  };

  return (
    <Card className={styles.charges}>
      {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
      <div>
        <h3>Your total estimated charges</h3>
        <span className={styles.percentageIncrease}>
          {!chargeValues.percentageIncrease ? (
            '------'
          ) : (
            <>
              {'+' + Math.round(chargeValues.percentageIncrease) + '%'}
              <sup>*</sup>
            </>
          )}
        </span>
      </div>
      <div className={styles.chargeImpact}>
        <h3>Your cost impact</h3>
        {!handleImpactValue(chargeValues.grandTotal) ? (
          <span className={styles.impact}>------</span>
        ) : (
          <span
            className={`${styles.impact} ${
              handleImpactValue(chargeValues.currentYearTotal).className
            }`}
          >
            {handleImpactValue(chargeValues.currentYearTotal).label}
          </span>
        )}
      </div>
    </Card>
  );
};

export { Charges };
