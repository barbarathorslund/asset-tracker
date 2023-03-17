import { useState, Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Entries } from "./ModeTab";

interface AddAssetModalProps {
  show: boolean;
  handleClose: () => void;
  assetTypes: string[];
  setAssetTypes: Dispatch<SetStateAction<string[]>>;
  entries: Entries[];
  setEntries: Dispatch<SetStateAction<Entries[]>>;
}

const AddAssetModal = ({
  show,
  handleClose,
  assetTypes,
  setAssetTypes,
  entries,
  setEntries,
}: AddAssetModalProps) => {
  const [assetTitle, setAssetTitle] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const assetExists = (asset: string) => {
    return assetTypes.includes(asset);
  };

  const getNewAssetEntries = (newAsset: string) => {
    entries.forEach((entry) => {
      if (entry.assets) {
        entry.assets[newAsset] = "";
      }
    });
    return entries;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <form>
        <Modal.Header closeButton>
          <Modal.Title>New asset type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column mx-3 mb-4">
            <label>Title</label>
            <input
              onChange={(e) => setAssetTitle(e.currentTarget.value)}
              type="text"
            />
            {showMessage && (
              <span className="text-danger">
                Input a valid title that does not already exist
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
              if (assetTitle && !assetExists(assetTitle)) {
                setEntries(getNewAssetEntries(assetTitle));
                setAssetTypes((prevArray) => [...prevArray, assetTitle]);
                handleClose();
                setShowMessage(false);
              } else {
                setShowMessage(true);
              }
            }}
          >
            Add asset
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddAssetModal;
