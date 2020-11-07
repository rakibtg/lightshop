import { Select } from "evergreen-ui";
import DataCell from "../components/DataCell";
import { useDispatch } from "react-redux";

import { setActiveProductRequirements } from "../store/Actions";

const GenericOptionSelector = ({ label, value = "", updatable, options }) => {
  const dispatch = useDispatch();
  const handleGenericOptionChange = (event) => {
    dispatch(
      setActiveProductRequirements({
        [updatable]: Number(event.target.value),
      })
    );
  };
  return (
    <DataCell label={label}>
      <Select width={130} onChange={handleGenericOptionChange} value={value}>
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </Select>
    </DataCell>
  );
};

export default GenericOptionSelector;
