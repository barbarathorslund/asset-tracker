import { Dispatch, SetStateAction } from "react";
import Card from "react-bootstrap/Card";
import { Entries } from "./ModeTab";

interface AssetCardProps {
  title: string;
  currentMonth: string;
  entries: Entries[];
  setEntries: Dispatch<SetStateAction<Entries[]>>;
}

const AssetCard = ({
  title,
  currentMonth,
  entries,
  setEntries,
}: AssetCardProps) => {
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
            assets[key] = e.currentTarget.value;
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
          <div className="d-flex mb-0 justify-content-between">
            <Card.Title>{title}</Card.Title>
          </div>
        </Card.Header>
        <Card.Body>
          <input
            type="text"
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
