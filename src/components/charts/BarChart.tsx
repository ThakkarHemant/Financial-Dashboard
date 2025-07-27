import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: any;
  title: string;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, height = 300 }) => {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#1F2937',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.dataset.label?.includes('%')) {
              label += context.parsed.y.toFixed(1) + '%';
            } else {
              label += new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          color: '#F3F4F6',
        },
        ticks: {
          callback: function(value) {
            if (typeof value === 'number') {
              if (value > 1000000) {
                return new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value);
              } else {
                return value.toFixed(1) + '%';
              }
            }
            return value;
          }
        },
      },
    },
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;