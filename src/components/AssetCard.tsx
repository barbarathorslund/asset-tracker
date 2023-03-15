import Card from "react-bootstrap/Card";
import { Entries } from "./ModeTab";

interface AssetCardProps {
  title: string;
  currentMonth: string;
  entries: Entries[];
}

const AssetCard = ({ title, currentMonth, entries }: AssetCardProps) => {
  return (
    <Card style={{ maxWidth: "444px" }} className="m-4">
      <form>
        <Card.Header>
          <div className="d-flex mb-0 justify-content-between">
            <Card.Title>{title}</Card.Title>
          </div>
        </Card.Header>
        <Card.Body>
          <input
            type="number"
            placeholder="Value"
            onChange={(e) => {
              console.log(e.target.value, title, currentMonth, entries);
            }}
          />
        </Card.Body>
      </form>
    </Card>
  );
};

export default AssetCard;
