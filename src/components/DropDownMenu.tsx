import { Dispatch, SetStateAction } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Entries } from "./ModeTab";

interface DropDownMenuProps {
  handleShowAddEntryModal: () => void;
  entries: Entries[];
  setEntries: Dispatch<SetStateAction<Entries[]>>;
  currentMonth: string;
  setCurrentMonth: Dispatch<SetStateAction<string>>;
}

const DropDownMenu = ({
  handleShowAddEntryModal,
  entries,
  setEntries,
  currentMonth,
  setCurrentMonth,
}: DropDownMenuProps) => {
  const removeCurrentDateEntry = () => {
    return entries.flatMap((entry) =>
      entry.month === currentMonth ? [] : entry
    );
  };

  return (
    <DropdownButton
      variant="primary"
      align="end"
      title="..."
      id="dropdown-menu-align-end"
      className="ms-2"
    >
      <Dropdown.Item eventKey="1" onClick={handleShowAddEntryModal}>
        Add new date entry
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        eventKey="2"
        onClick={() => {
          setEntries(removeCurrentDateEntry());
          setCurrentMonth(entries[0].month);
        }}
      >
        Remove date entry
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default DropDownMenu;
