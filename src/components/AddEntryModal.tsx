import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Entries } from "./ModeTab";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  entries: Entries[];
  setEntries: Dispatch<SetStateAction<Entries[]>>;
}

const EntryModal = ({ show, handleClose, entries, setEntries }: ModalProps) => {
  const [entryMonth, setEntryMonth] = useState("");

  const getCurrentMonth = () => {
    const d = new Date();
    let year = d.getFullYear();
    let month = String(d.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  };

  function monthExists(month: string) {
    return entries.some(function (el) {
      return el.month === month;
    });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="d-flex flex-column mx-3 mb-4">
          <label>Month</label>
          <input
            onChange={(e) => setEntryMonth(e.target.value)}
            type="month"
            id="entryMonth"
            max={getCurrentMonth()}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (!monthExists(entryMonth)) {
              setEntries((prevArray) => [{ month: entryMonth }, ...prevArray]);
            }
            handleClose();
          }}
        >
          Add entry
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EntryModal;
