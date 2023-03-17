import { Dispatch, SetStateAction, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddEntryModal from "./AddEntryModal";
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

  const handleShowAddEntryModal = () => setShowAddEntryModal(true);
  const handleCloseAddEntryModal = () => setShowAddEntryModal(false);

  const setMostRecentMonth = () => {
    if (entries.length > 0) {
      return entries[0].month;
    } else {
      return "";
    }
  };

  const [currentMonth, setCurrentMonth] = useState(setMostRecentMonth());

  // useEffect(() => {
  //   if (entries.length > 0) {
  //     setCurrentMonth(entries[0].month);
  //   }
  // }, []);

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
        <DropDownMenu handleShowAddEntryModal={handleShowAddEntryModal} />
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
          variant="primary"
        >
          + Add asset
        </Button>
      </div>
    </>
  );
};

export default Tracker;
