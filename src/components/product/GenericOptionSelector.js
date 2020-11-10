import { Select } from "evergreen-ui";
import DataCell from "../DataCell";
import { useDispatch } from "react-redux";

import { updateProductViewSelection } from "../../store/actions/ProductView";

const GenericOptionSelector = ({ label, value = "", updatable, options }) => {
  const dispatch = useDispatch();
  const handleGenericOptionChange = (event) => {
    dispatch(
      updateProductViewSelection({
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
