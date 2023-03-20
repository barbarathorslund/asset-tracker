import React, { useEffect, useState } from "react";
import { Entries } from "./ModeTab";

interface SummaryProps {
  entries: Entries[];
}

const Summary = ({ entries }: SummaryProps) => {
  useEffect(() => {
    if (entries.length > 0) {
      parseData();
    }
  }, [entries]);

  const parseData = () => {
    let datasets: any = [];

    // Set assets
    Object.keys(entries[0].assets as Object).forEach((asset) => {
      let obj = { [asset]: [] };
      datasets.push(obj);
    });

    // Set datapoints
    entries.forEach((entry) => {
      datasets.forEach((dataset: Object) => {
        Object.values(dataset)[0].push({
          t: entry.month,
          y: Number(entry.assets?.[Object.keys(dataset)[0]]),
        });
      });
    });

    return datasets;
  };

  return <div>Summary</div>;
};

export default Summary;
