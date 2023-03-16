import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Entries } from "./ModeTab";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  entries: Entries[];
  setEntries: Dispatch<SetStateAction<Entries[]>>;
  setCurrentMonth: React.Dispatch<React.SetStateAction<string>>;
}

const EntryModal = ({
  show,
  handleClose,
  entries,
  setEntries,
  setCurrentMonth,
}: ModalProps) => {
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

  function sortEntries(entries: Entries[]) {
    const sorted = [...entries].sort((a: Entries, b: Entries) => {
      let date1 = new Date(a.month) as any;
      let date2 = new Date(b.month) as any;
      return date2 - date1;
    });
    return sorted;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <form>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column mx-3 mb-4">
            <label>Month</label>
            <input
              onChange={(e) => setEntryMonth(e.target.value)}
              type="month"
              id="entryMonth"
              max={getCurrentMonth()}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              if (entryMonth && !monthExists(entryMonth)) {
                e.preventDefault();
                setEntries((prevArray) =>
                  // Contruct new entry, merge with old entries and sort
                  sortEntries([{ month: entryMonth }, ...prevArray])
                );
                setCurrentMonth(entryMonth);
                handleClose();
              }
            }}
          >
            Add entry
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EntryModal;
