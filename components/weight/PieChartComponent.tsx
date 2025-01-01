import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useAccount } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";
import useTotalWeight from "hooks/ScoreWeightController/useTotalWeight";
import useScoreWeights from "hooks/ScoreWeightController/useScoreWeights";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChartComponent = () => {
  const { config } = useContractContext();
  const themeColors = config.themeColors;
  const { address } = useAccount();
  const [percentages, setPercentages] = useState<number[]>([]);

  const { data: totalWeight } = useTotalWeight(address) as {
    data: bigint | undefined;
  };
  const { data: scoreWeights } = useScoreWeights(address);

  useEffect(() => {
    if (totalWeight && Array.isArray(scoreWeights)) {
      const newPercentages = scoreWeights.map((score: any) => {
        const percentage = (Number(score.result) / Number(totalWeight)) * 100;
        return percentage;
      });
      setPercentages(newPercentages);
    }
  }, [totalWeight, scoreWeights]);

  const data = {
    labels: ["CJPY", "CUSD", "CEUR"],
    datasets: [
      {
        data: percentages, // 各通貨の投票比率
        backgroundColor: [
          themeColors.primaryColor,
          themeColors.secondaryColor,
          themeColors.tertiaryColor,
        ],
        hoverBackgroundColor: [
          themeColors.primaryColor,
          themeColors.secondaryColor,
          themeColors.tertiaryColor,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
      datalabels: {
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a: number, b: number) => a + b,
            0,
          );
          const percentage = ((value / total) * 100).toFixed(1) + "%";
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${percentage}`;
        },
        color: "white",
        font: {
          weight: "bold" as "bold",
          size: 16,
        },
      },
      tooltip: {
        backgroundColor: themeColors.primaryText,
        bodyFont: {
          size: 16,
        },
        callbacks: {
          label: function (tooltipItem: any) {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce(
              (a: number, b: number) => a + b,
              0,
            );
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const percentage = ((currentValue / total) * 100).toFixed(1) + "%";
            return `${percentage}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartComponent;
