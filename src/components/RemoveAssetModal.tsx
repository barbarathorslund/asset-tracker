import { Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Entries } from "./ModeTab";

interface RemoveAssetModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  entries: Entries[];
  setEntries: Dispatch<SetStateAction<Entries[]>>;
  assetTypes: string[];
  setAssetTypes: Dispatch<SetStateAction<string[]>>;
}

const RemoveAssetModal = ({
  show,
  handleClose,
  title,
  entries,
  setEntries,
  assetTypes,
  setAssetTypes,
}: RemoveAssetModalProps) => {
  const getDeletedAssetEntries = () => {
    entries.forEach((entry) => {
      delete entry.assets?.[title];
    });
    return entries;
  };

  const filteredAssetTypes = () => {
    return assetTypes.filter((asset) => asset !== title);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <form>
        <Modal.Header closeButton>
          <Modal.Title>Remove asset type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will remove records of the asset throughout all entries.
          <br />
          Do you still want to remove the <strong>{title}</strong> asset type?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
            }}
          >
            No
          </Button>
          <Button
            variant="secondary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setEntries(getDeletedAssetEntries());
              setAssetTypes(filteredAssetTypes());
              handleClose();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default RemoveAssetModal;
