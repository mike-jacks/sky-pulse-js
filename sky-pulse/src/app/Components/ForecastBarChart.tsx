import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Period {
  number: number;
  name: string;
  startTime: string;
  temperature: number;
  temperatureUnit: string;
  icon: string;
  isDaytime: boolean;
}

interface ForecastProps {
  forecast: Period[];
  isDay: boolean;
}


const ForecastBarChart: React.FC<ForecastProps> = ({ forecast, isDay }) => {
  const chartRef = useRef(null);

  const daytimeForecast = forecast.filter((period) => period.isDaytime);
  const nighttimeForecast = forecast.filter((period) => !period.isDaytime)
  
  const allTemperatures = forecast.map((period) => period.temperature);

  const minTemperature = Math.min(...allTemperatures);
  const maxTemperature = Math.max(...allTemperatures);

  const currentForecast = isDay ? daytimeForecast : nighttimeForecast;
  const currentForecastTemperatures = currentForecast.map((period) => period.temperature);

  const data = {
    labels: currentForecast.map((period) => period.name),
    datasets: [
      {
        label: 'Temperature',
        data: currentForecastTemperatures,
        backgroundColor: function(context: any) {
          const chart = context.chart;
          const {ctx, chartArea, scales} = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

          gradient.addColorStop(0, 'rgba(0, 191, 255, 0.8)'); // Deep sky blue
          gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.8)'); // Yellow
          gradient.addColorStop(0.8, 'rgba(255, 69, 0, 0.8)'); // Bright red/orange

          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temperature Forecast',
      },
    },
    scales: {
      y: {
        min: minTemperature - 5,
        max: maxTemperature + 5,
        title: {
          display: true,
          text: 'Temperature',
        },
      },
    },
  };

  return (
  <div className="grid grid-cols-6 grid-rows-1 max-h-96">
    <div className="col-start-2 col-span-4">
    <Bar ref={chartRef} data={data} options={options} />
    </div>
  </div>
  )
};

export default ForecastBarChart;
