import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Summary from "./Summary";
import Tracker from "./Tracker";

const ModeTab = () => {
  return (
    <Tabs
      defaultActiveKey="summary"
      id="uncontrolled-tab-example"
      className="mt-3"
    >
      <Tab eventKey="summary" title="Summary" className="m-3">
        <Summary />
      </Tab>
      <Tab eventKey="tracker" title="Tracker" className="m-3">
        <Tracker />
      </Tab>
    </Tabs>
  );
};

export default ModeTab;
