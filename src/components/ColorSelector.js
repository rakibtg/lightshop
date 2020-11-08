import { Select } from "evergreen-ui";
import DataCell from "../components/DataCell";
import upperFirst from "../helpers/upperFirst";
import { useDispatch } from "react-redux";

import {
  setSelectedOption,
  setActiveProductRequirements,
} from "../store/Actions";

const ColorSelector = ({ options, value }) => {
  const dispatch = useDispatch();
  const availableColors = options.map((op) => op.color);
  const handleOptionSelection = (event) => {
    const selectedColor = event.target.value.toLowerCase();
    const selectedOption = options.find((op) => op.color === selectedColor);
    dispatch(
      setActiveProductRequirements({
        ...selectedOption,
        quantity: selectedOption.quantity > 1 ? 1 : selectedOption.quantity,
      })
    );
    dispatch(setSelectedOption(selectedOption));
  };
  return (
    <DataCell label="Color">
      <Select width={130} onChange={handleOptionSelection} value={value}>
        {availableColors.map((color, index) => {
          return (
            <option key={index} value={color}>
              {upperFirst(color)}
            </option>
          );
        })}
      </Select>
    </DataCell>
  );
};

export default ColorSelector;
