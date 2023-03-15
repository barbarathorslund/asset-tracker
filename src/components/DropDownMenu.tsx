import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

interface DropDownMenuProps {
  handleShowAddEntryModal: () => void;
}

const DropDownMenu = ({ handleShowAddEntryModal }: DropDownMenuProps) => {
  return (
    <DropdownButton
      variant="outline-primary"
      align="end"
      title="..."
      id="dropdown-menu-align-end"
      className="ms-2"
    >
      <Dropdown.Item eventKey="1" onClick={handleShowAddEntryModal}>
        Add new date entry
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="2">Manage asset types</Dropdown.Item>
    </DropdownButton>
  );
};

export default DropDownMenu;
