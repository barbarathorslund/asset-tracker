import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Summary from "./Summary";
import Tracker from "./Tracker";

export interface Entries {
  month: string;
}

export const ModeTab = () => {
  const [assetTypes, setAssetTypes] = useState(["Savings", "Investments"]);
  const [entries, setEntries] = useState<Entries[]>([
    { month: "2021-05" },
    { month: "2023-01" },
    { month: "2023-02" },
    { month: "2022-05" },
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
        <Tracker
          entries={entries}
          setEntries={setEntries}
          assetTypes={assetTypes}
        />
      </Tab>
    </Tabs>
  );
};
