import { useState, useEffect } from "react";
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
  const [entries, setEntries] = useState<Entries[]>(() => {
    const saved = localStorage.getItem("entries") as string;
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

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
