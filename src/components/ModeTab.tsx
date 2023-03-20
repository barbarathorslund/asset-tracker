import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Summary from "./Summary";
import Tracker from "./Tracker";

export interface Entries {
  month: string;
  assets?: {
    [key: string]: string;
  };
}

export const ModeTab = () => {
  const [entries, setEntries] = useState<Entries[]>([]);

  return (
    <Tabs
      defaultActiveKey="summary"
      id="uncontrolled-tab-example"
      className="mt-3"
    >
      <Tab eventKey="summary" title="Summary">
        <Summary entries={entries} />
      </Tab>
      <Tab eventKey="tracker" title="Tracker">
        <Tracker entries={entries} setEntries={setEntries} />
      </Tab>
    </Tabs>
  );
};
