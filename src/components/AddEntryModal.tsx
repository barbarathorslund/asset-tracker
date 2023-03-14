import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

type modalProps = {
  show: boolean;
  handleClose: () => void;
};

const EntryModal = ({ show, handleClose }: modalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="d-flex flex-column mx-3 mb-4">
          <label>Month</label>
          <input
            type="month"
            id="validationCustom01"
            placeholder="First name"
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Add entry
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EntryModal;
