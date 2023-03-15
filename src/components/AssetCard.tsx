import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

interface AssetCardProps {
  title: string;
}

const AssetCard = ({ title }: AssetCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Card style={{ maxWidth: "444px" }} className="m-4">
      <form>
        <Card.Header>
          <div className="d-flex mb-0 justify-content-between">
            <Card.Title>{title}</Card.Title>
            {isEditing ? (
              <Button
                variant="primary"
                size="sm"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();

                  toggleEdit();
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  toggleEdit();
                  e.preventDefault();
                }}
              >
                Edit
              </Button>
            )}
          </div>
        </Card.Header>
        <Card.Body>
          <input type="number" placeholder="Value" disabled={!isEditing} />
        </Card.Body>
      </form>
    </Card>
  );
};

export default AssetCard;
