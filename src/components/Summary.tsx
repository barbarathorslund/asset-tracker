import React, { useCallback, useEffect, useState } from "react";
import { Entries } from "./ModeTab";
import LineChart from "./LineChart";

interface SummaryProps {
  entries: Entries[];
}

const Summary = ({ entries }: SummaryProps) => {
  const [chartDatasets, setChartDatasets] = useState([]);

  const parseData = useCallback(() => {
    return (entries as any)
      .map((entry: any) =>
        Object.keys(entry.assets).map((asset) => {
          return {
            name: asset,
            x: entry.month,
            y: Number(entry.assets[asset]),
          };
        })
      )
      .flat();
  }, [entries]);

  useEffect(() => {
    if (entries.length > 0) {
      setChartDatasets(parseData());
    }
  }, [entries, parseData]);

  return (
    <div className="summary d-flex justify-content-center align-items-center">
      <div className="chart-container m-4">
        <LineChart chartDatasets={chartDatasets} />
      </div>
    </div>
  );
};

export default Summary;
