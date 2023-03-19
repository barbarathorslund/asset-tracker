import { Dispatch, SetStateAction, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddEntryModal from "./AddEntryModal";
import AddAssetModal from "./AddAssetModal";
import { Entries } from "./ModeTab";
import AssetCard from "./AssetCard";
import DropDownMenu from "./DropDownMenu";

interface TrackerProps {
  entries: Entries[];
  setEntries: Dispatch<SetStateAction<Entries[]>>;
}

const Tracker = ({ entries, setEntries }: TrackerProps) => {
  const [assetTypes, setAssetTypes] = useState(["Savings", "Investments"]);
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);

  const handleShowAddEntryModal = () => setShowAddEntryModal(true);
  const handleCloseAddEntryModal = () => setShowAddEntryModal(false);
  const handleShowAddAssetModal = () => setShowAddAssetModal(true);
  const handleCloseAddAssetModal = () => setShowAddAssetModal(false);

  const setMostRecentMonth = () => {
    if (entries.length > 0) {
      return entries[0].month;
    } else {
      return "";
    }
  };

  const [currentMonth, setCurrentMonth] = useState(setMostRecentMonth());

  const renderEntryAssetCards = (entry: Entries) => {
    return Object.keys(entry.assets as object).map((key) => (
      <AssetCard
        title={key}
        currentMonth={currentMonth}
        key={key}
        entries={entries}
        setEntries={setEntries}
        assetTypes={assetTypes}
        setAssetTypes={setAssetTypes}
      />
    ));
  };

  return (
    <>
      <div className="d-flex border-bottom p-4">
        <Form.Select
          className="maxw-400"
          value={currentMonth}
          onChange={(e) => {
            setCurrentMonth(e.target.value);
          }}
        >
          {entries.length > 0 ? (
            entries?.map((entry) => (
              <option key={entry.month}>{entry.month}</option>
            ))
          ) : (
            <option>No entries</option>
          )}
        </Form.Select>
        <DropDownMenu
          handleShowAddEntryModal={handleShowAddEntryModal}
          entries={entries}
          setEntries={setEntries}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
        <AddEntryModal
          show={showAddEntryModal}
          handleClose={handleCloseAddEntryModal}
          entries={entries}
          setEntries={setEntries}
          setCurrentMonth={setCurrentMonth}
          assetTypes={assetTypes}
        />
      </div>
      <div style={{ maxWidth: "490px" }} className="d-flex flex-column m-1">
        {entries.map((entry) => {
          if (entry.month === currentMonth && entry.assets) {
            return renderEntryAssetCards(entry);
          } else {
            return null;
          }
        })}
        <Button
          style={{ width: "150px" }}
          className="align-self-center my-3"
          variant="outline-primary"
          onClick={handleShowAddAssetModal}
        >
          + Add asset
        </Button>
        <AddAssetModal
          show={showAddAssetModal}
          handleClose={handleCloseAddAssetModal}
          assetTypes={assetTypes}
          setAssetTypes={setAssetTypes}
          entries={entries}
          setEntries={setEntries}
        />
      </div>
    </>
  );
};

export default Tracker;
