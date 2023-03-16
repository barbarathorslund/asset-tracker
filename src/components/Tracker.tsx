import React, { Dispatch, SetStateAction, useState } from "react";
import Form from "react-bootstrap/Form";
import AddEntryModal from "./AddEntryModal";
import { Entries } from "./ModeTab";
import AssetCard from "./AssetCard";
import DropDownMenu from "./DropDownMenu";

interface TrackerProps {
  entries: Entries[];
  setEntries: Dispatch<SetStateAction<Entries[]>>;
}

const Tracker = ({ entries, setEntries }: TrackerProps) => {
  const [currentMonth, setCurrentMonth] = useState(entries[0].month);
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);

  const handleCloseAddEntryModal = () => setShowAddEntryModal(false);
  const handleShowAddEntryModal = () => setShowAddEntryModal(true);

  const renderEntryAssetCards = (entry: Entries) => {
    return Object.keys(entry.assets as object).map((key) => (
      <AssetCard
        title={key}
        currentMonth={currentMonth}
        key={key}
        entries={entries}
        setEntries={setEntries}
      />
    ));
  };

  return (
    <>
      <div className="d-flex border-bottom p-4">
        <AddEntryModal
          show={showAddEntryModal}
          handleClose={handleCloseAddEntryModal}
          entries={entries}
          setEntries={setEntries}
          setCurrentMonth={setCurrentMonth}
        />
        <Form.Select
          className="maxw-400"
          value={currentMonth}
          onChange={(e) => {
            setCurrentMonth(e.target.value);
          }}
        >
          {entries?.map((entry) => (
            <option key={entry.month}>{entry.month}</option>
          ))}
        </Form.Select>
        <DropDownMenu handleShowAddEntryModal={handleShowAddEntryModal} />
      </div>
      {entries ? (
        entries.map((entry) => {
          if (entry.month === currentMonth && entry.assets) {
            return renderEntryAssetCards(entry);
          } else {
            return null;
          }
        })
      ) : (
        <div>No entries</div>
      )}
    </>
  );
};

export default Tracker;
