import { useMemo } from 'react';
import { CalculatorYearlyResults } from '../../types/calculator.ts';

import { DoughnutChart } from '../charts/doughnutChart/doughnutChart.tsx';
import { getDates } from '../../lib/dates/getDates.ts';

import styles from './calcResultsDoughnuts.module.css';
import { Card } from '../ui/card/card.tsx';

const legendItems = [
  { label: 'Network Charge Cost', color: '#753BBD' },
  { label: 'Policy Cost', color: '#B8277D' },
  { label: 'Systems Cost', color: '#005CA9' },
];

const dates = getDates();

interface CalcResultsDoughnutsProps {
  results: CalculatorYearlyResults[];
}

const formatChartData = (values: CalculatorYearlyResults) => ({
  system: Math.round(values.totals.systemPercentage),
  network: Math.round(values.totals.networkPercentage),
  policy: Math.round(values.totals.policyPercentage),
});

const CalcResultsDoughnuts = ({ results }: CalcResultsDoughnutsProps) => {
  const startYear = new Date().getFullYear();
  const doughnutValues = useMemo(() => {
    const today = new Date().getFullYear();
    const nextYear = today + 1;
    const futureDate = today + 5;
    const endDate = futureDate + 1;

    const startFiscalYear = `${dates.startYear}-${dates.nextYear}`;
    const endFiscalYear = `${dates.fiveYearsInFuture}-${dates.endYear}`;

    const currentYearValues = results.find(
      (item) => item.fiscalYear === startFiscalYear,
    );

    const endYearValues = results.find(
      (item) => item.fiscalYear === endFiscalYear,
    );

    const currentYearTotals = formatChartData(currentYearValues);
    const endYearTotals = formatChartData(endYearValues);

    return { currentYearTotals, endYearTotals };
  }, [results]);

  return (
    <Card>
      <h2>Future vs. today: Non-commodity cost breakdown</h2>
      <div className={styles.chartWrapper}>
        <div>
          <DoughnutChart
            values={doughnutValues.currentYearTotals}
            centerLabel={['Your', 'business', `(${startYear})`]}
          />
        </div>
        <div className={styles.doughnutKey}>
          <ul>
            {legendItems.map((item) => (
              <li key={item.label}>
                <span style={{ backgroundColor: item.color }}></span>{' '}
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <DoughnutChart
            values={doughnutValues.endYearTotals}
            centerLabel={['Your', 'business', `(${startYear + 5})`]}
          />
        </div>
      </div>
    </Card>
  );
};

export { CalcResultsDoughnuts };
