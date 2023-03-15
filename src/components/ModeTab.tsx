import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Summary from "./Summary";
import Tracker from "./Tracker";

export interface Entries {
  month: string;
  assets?: {
    [key: string]: number;
  };
}

export const ModeTab = () => {
  const [entries, setEntries] = useState<Entries[]>([
    { month: "2021-05", assets: { Savings: 1, Investments: 1 } },
    { month: "2023-01", assets: { Savings: 1, Investments: 1 } },
    { month: "2023-02", assets: { Savings: 1, Investments: 1 } },
    { month: "2022-05", assets: { Savings: 1, Investments: 1 } },
  ]);

  return (
    <Tabs
      defaultActiveKey="summary"
      id="uncontrolled-tab-example"
      className="mt-3"
    >
      <Tab eventKey="summary" title="Summary">
        <Summary />
      </Tab>
      <Tab eventKey="tracker" title="Tracker">
        <Tracker entries={entries} setEntries={setEntries} />
      </Tab>
    </Tabs>
  );
};
