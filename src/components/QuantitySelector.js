import { Select } from "evergreen-ui";
import DataCell from "../components/DataCell";
import { useDispatch } from "react-redux";

import { setActiveProductRequirements } from "../store/Actions";

const QuantitySelector = ({ quantity, value = "", updateOptionsValue }) => {
  const dispatch = useDispatch();
  const options = new Array(quantity).fill(0);
  const handleQuantityChange = (event) => {
    dispatch(
      setActiveProductRequirements({
        quantity: Number(event.target.value),
      })
    );
  };
  return (
    <DataCell label="Quantity">
      <>
        <Select
          width={130}
          onChange={handleQuantityChange}
          value={value}
          disabled={value <= 0}
        >
          {options.map((option, index) => {
            const optionValue = index + 1;
            return (
              <option key={optionValue} value={optionValue}>
                {optionValue}
              </option>
            );
          })}
          {value <= 0 && <option>Out of stock</option>}
        </Select>
      </>
    </DataCell>
  );
};

export default QuantitySelector;
