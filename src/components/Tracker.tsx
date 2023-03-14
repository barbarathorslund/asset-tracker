import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddEntryModal from "./AddEntryModal";

const Tracker = () => {
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
        />
        <Form.Select className="maxw-400">
          <option>Default select1</option>
          <option>Default select2</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default Tracker;
