import { Dispatch, SetStateAction, useState } from "react";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import { Entries } from "./ModeTab";
import RemoveAssetModal from "./RemoveAssetModal";

interface AssetCardProps {
  title: string;
  currentMonth: string;
  entries: Entries[];
  setEntries: Dispatch<SetStateAction<Entries[]>>;
  assetTypes: string[];
  setAssetTypes: Dispatch<SetStateAction<string[]>>;
}

const AssetCard = ({
  title,
  currentMonth,
  entries,
  setEntries,
  assetTypes,
  setAssetTypes,
}: AssetCardProps) => {
  const [showRemoveAssetModal, setShowRemoveAssetModal] = useState(false);

  const handleShowRemoveAssetModal = () => {
    setShowRemoveAssetModal(true);
  };

  const handleCloseRemoveAssetModal = () => {
    setShowRemoveAssetModal(false);
  };

  const getAssetValue = () => {
    let currentMonthEntry = entries?.find(
      (entry) => entry.month === currentMonth
    );
    return currentMonthEntry?.assets?.[title];
  };

  const changeAssetValue = (e: React.FormEvent<HTMLInputElement>) => {
    return entries.map((entry) => {
      if (entry.month === currentMonth) {
        // get changed asset object
        let assets: { [key: string]: string } = {};
        Object.entries(entry.assets as object).forEach(([key, val]) => {
          if (key === title) {
            // Set user input value, ensuring only numbers
            assets[key] = e.currentTarget.value.replace(/\D/, "");
          } else {
            assets[key] = val;
          }
        });
        // Get changed entry
        return { month: entry.month, assets };
      } else {
        // Get all non-changed entries
        return entry;
      }
    });
  };

  return (
    <Card className="m-3">
      <form>
        <Card.Header>
          <div className="d-flex mb-0 justify-content-between align-items-center">
            <h5 id="asset-card-title">{title}</h5>
            <CloseButton
              aria-label="Remove asset"
              onClick={handleShowRemoveAssetModal}
            />
          </div>
          <RemoveAssetModal
            show={showRemoveAssetModal}
            handleClose={handleCloseRemoveAssetModal}
            title={title}
            entries={entries}
            setEntries={setEntries}
            assetTypes={assetTypes}
            setAssetTypes={setAssetTypes}
          />
        </Card.Header>
        <Card.Body>
          <input
            type="tel"
            id="asset-value"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Value"
            value={getAssetValue()}
            onChange={(e) => {
              setEntries(changeAssetValue(e));
            }}
          />
        </Card.Body>
      </form>
    </Card>
  );
};

export default AssetCard;
