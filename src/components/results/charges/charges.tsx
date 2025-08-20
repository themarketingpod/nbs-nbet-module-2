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

  const handleImpactValue = (percentage: number) => {
    let label: string = '';
    let className: string = '';
    if (percentage <= 20) {
      label = 'Low';
      className = styles['impact-low'];
    } else if (percentage > 20 && percentage <= 50) {
      label = 'Medium';
      className = styles['impact-medium'];
    } else if (percentage > 50) {
      label = 'High';
      className = styles['impact-high'];
    } else {
      return null;
    }
    return { label, className };
  };

  const impact = handleImpactValue(chargeValues.percentageIncrease);

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
        {!impact ? (
          <span className={styles.impact}>------</span>
        ) : (
          <span className={`${styles.impact} ${impact.className}`}>
            {impact.label}
          </span>
        )}
      </div>
    </Card>
  );
};

export { Charges };
