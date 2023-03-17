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
  assetTypes: string[];
}

const EntryModal = ({
  show,
  handleClose,
  entries,
  setEntries,
  setCurrentMonth,
  assetTypes,
}: ModalProps) => {
  const [entryMonth, setEntryMonth] = useState("");
  const [showMessage, setShowMessage] = useState(false);

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

  const getNewEntryObject = () => {
    let assets: { [key: string]: string } = {};
    assetTypes.forEach((asset: string) => {
      assets[asset] = "";
    });
    return { month: entryMonth, assets };
  };

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
              onChange={(e) => setEntryMonth(e.currentTarget.value)}
              type="month"
              id="entryMonth"
              max={getCurrentMonth()}
            />
            {showMessage && (
              <span className="text-danger">
                Select a valid month with no pre-existing entries
              </span>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setShowMessage(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (entryMonth && !monthExists(entryMonth)) {
                setEntries((prevArray) =>
                  // Contruct new entry, merge with old entries and sort
                  sortEntries([getNewEntryObject(), ...prevArray])
                );
                setCurrentMonth(entryMonth);
                handleClose();
                setShowMessage(false);
              } else {
                setShowMessage(true);
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
