import React, { Dispatch, SetStateAction, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddEntryModal from "./AddEntryModal";
import { Entries } from "./ModeTab";
import AssetCard from "./AssetCard";

interface TrackerProps {
  entries: Entries[];
  setEntries: Dispatch<SetStateAction<Entries[]>>;
  assetTypes: string[];
}

const Tracker = ({ entries, setEntries, assetTypes }: TrackerProps) => {
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);

  const handleCloseAddEntryModal = () => setShowAddEntryModal(false);
  const handleShowAddEntryModal = () => setShowAddEntryModal(true);

  return (
    <div>
      <div className="d-flex border-bottom p-4">
        <Button
          onClick={handleShowAddEntryModal}
          variant="outline-primary"
          className="me-2"
        >
          +
        </Button>
        <AddEntryModal
          show={showAddEntryModal}
          handleClose={handleCloseAddEntryModal}
          entries={entries}
          setEntries={setEntries}
        />
        <Form.Select className="maxw-400">
          {entries?.map((entry) => (
            <option key={entry.month}>{entry.month}</option>
          ))}
        </Form.Select>
      </div>
      {assetTypes.map((type) => (
        <AssetCard title={type} key={type} />
      ))}
    </div>
  );
};

export default Tracker;
