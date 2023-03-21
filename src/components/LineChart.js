import { Line } from "react-chartjs-2";
import "chart.js/auto";

const LineChart = ({ chartDatasets }) => {
  const transparentColor = (color) => {
    const rgbNumbers = color.match(/([0-9+],?)+/g);
    return `rgba(${rgbNumbers.join(" ")}, 0.5)`;
  };

  const decideColor = (index) => {
    return COLORS[index % COLORS.length];
  };

  const COLORS = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
  ];

  const options = {
    indexAxis: "x",
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 1000,
      },
    },
    elements: {},
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // [
  //  {Savings: [{t: '2023-01', y: 22}, {t: '2023-02', y: null}]},
  //  {Investments: [{t: '2023-01', y: 33}, {t: '2023-02', y: 40}]}
  // ]
  const labels = [...new Set(chartDatasets.map((dataset) => dataset.x))];

  const datasets = {};
  chartDatasets.forEach((dataset) => {
    if (!datasets?.[dataset.name]) {
      datasets[dataset.name] = [dataset.y];
    } else {
      datasets[dataset.name].push(dataset.y);
    }
  });

  const data = {
    labels: labels.reverse(),
    datasets: Object.keys(datasets).map((entry, idx) => {
      return {
        label: entry,
        data: datasets[entry].reverse(),
        borderColor: decideColor(idx),
        backgroundColor: transparentColor(decideColor(idx)),
      };
    }),
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
