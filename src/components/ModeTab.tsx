import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Summary from "./Summary";
import Tracker from "./Tracker";

const ModeTab = () => {
  const [assetTypes, setAssetTypes] = useState([]);
  const [entries, setEntries] = useState(["January 2023", "February 2023"]);
  const [currentMonth, setCurrentMonth] = useState("");

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
        <Tracker />
      </Tab>
    </Tabs>
  );
};

export default ModeTab;
