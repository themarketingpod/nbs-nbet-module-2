import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, DataLabels);

const centerTextLabel = {
  id: 'centerTextLabel',
  beforeDraw: (chart) => {
    const { ctx, chartArea } = chart;
    const options = chart.options.plugins.centerTextLabel;

    if (!options || !options.display || !chartArea) {
      return;
    }

    ctx.save();
    ctx.font = options.font || 'bold 20px sans-serif';
    ctx.fillStyle = options.color || 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    const textLines = Array.isArray(options.text)
      ? options.text
      : [options.text];

    const lineHeight = 25;
    const totalLines = textLines.length;
    const startY = centerY - ((totalLines - 1) * lineHeight) / 2;

    let maxWidth;
    const meta = chart.getDatasetMeta(0);
    const arc = meta.data[0];

    if (arc) {
      maxWidth = arc.innerRadius * 2 * 0.9;
    }

    textLines.forEach((line, index) => {
      const y = startY + index * lineHeight;
      ctx.fillText(line, centerX, y, maxWidth);
    });

    ctx.restore();
  },
};

const DoughnutChart = ({ values, centerLabel }) => {
  const placeHolderData = {
    labels: [],
    datasets: [
      {
        data: [100],
        backgroundColor: ['#f0f0f0'],
        borderWidth: 0,
      },
    ],
  };

  const calcData = {
    labels: ['System', 'Network', 'Policy'],
    datasets: [
      {
        label: '%',
        data: [values.system, values.network, values.policy],
        backgroundColor: ['#005CA9', '#753BBD', '#B8277D'],

        borderWidth: 0,
      },
    ],
  };

  const data = values.network ? calcData : placeHolderData;

  const options = {
    cutout: '50%',
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: values.network,
        color: '#FFFFFF',
        font: {
          weight: 'bold' as const,
          size: 16,
          family: 'Rubik, sans-serif',
        },
        formatter: (value, context) => {
          return `${value}%`;
        },
      },
      centerTextLabel: {
        display: true,
        text: centerLabel ?? null,
        color: '#314C85',
        font: 'bold 18px Rubik, sans-serif',
      },
    },
  };

  return <Doughnut data={data} options={options} plugins={[centerTextLabel]} />;
};

export { DoughnutChart };
