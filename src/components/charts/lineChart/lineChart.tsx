import { useMemo } from 'react';
import { getYears } from '../../../lib/dates/getYears.ts';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

import styles from './lineChart.module.css';

const LineChart = ({ results }) => {
  const chartValues = useMemo(() => {
    const chartTotals = results.map((result) => {
      const { systemTotal, policyTotal, networkTotal } = result.totals;

      return (
        Math.round(systemTotal) +
        Math.round(policyTotal) +
        Math.round(networkTotal)
      );
    });

    return chartTotals;
  }, [results]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 20,
          boxHeight: 2,
        },
      },
      datalabels: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    layout: {
      padding: {
        bottom: 20,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cost (£)',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const labels = getYears();

  const data = {
    labels,
    datasets: [
      {
        label: 'Your estimated charges by 2030',
        data: chartValues,
        borderColor: '#D50032',
        backgroundColor: '#D50032',
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export { LineChart };
