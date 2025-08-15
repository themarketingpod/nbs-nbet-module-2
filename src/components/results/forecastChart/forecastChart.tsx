import { CalculatorYearlyResults } from '../../../types/calculator.ts';
import { LineChart } from '../../charts/lineChart/lineChart.tsx';
import styles from './forecastChart.module.css';

interface ForecastChartProps {
  results: CalculatorYearlyResults[];
}

const ForecastChart = ({ results }: ForecastChartProps) => {
  return (
    <section className={styles.forecastChart}>
      <h2>Your 5-year savings forecast</h2>
      <LineChart results={results} />
    </section>
  );
};

export { ForecastChart };
