import { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Select } from "evergreen-ui";
import { setProductViewSelectedOptions } from "../store/Actions";
import upperFirst from "../helpers/upperFirst";
import DataCell from "../components/DataCell";

const ColorSelector = ({ options, updateOptionsValue, setSelectedOption }) => {
  const availableColors = options.map((op) => op.color);
  const handleOptionSelection = (event) => {
    const selectedColor = event.target.value.toLowerCase();
    const selectedOption = options.find((op) => op.color === selectedColor);
    updateOptionsValue({
      ...selectedOption,
      quantity: selectedOption.quantity > 1 ? 1 : selectedOption.quantity,
    });
    setSelectedOption(selectedOption);
  };
  return (
    <DataCell label="Color">
      <Select width={100} onChange={handleOptionSelection}>
        {availableColors.map((color, index) => {
          return <option key={index}>{upperFirst(color)}</option>;
        })}
      </Select>
    </DataCell>
  );
};

const GenericOptionSelector = ({
  label,
  updatable,
  options,
  updateOptionsValue,
}) => {
  const handleGenericOptionChange = (event) => {
    updateOptionsValue({
      [updatable]: Number(event.target.value),
    });
  };
  return (
    <DataCell label={label}>
      <Select width={100} onChange={handleGenericOptionChange}>
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </Select>
    </DataCell>
  );
};

const QuantitySelector = ({ quantity, updateOptionsValue }) => {
  const options = new Array(quantity).fill(0);
  const handleQuantityChange = (event) => {
    updateOptionsValue({
      quantity: Number(event.target.value),
    });
  };
  return (
    <DataCell label="Quantity">
      <Select width={100} onChange={handleQuantityChange}>
        {options.map((option, index) => {
          const value = index + 1;
          return <option key={value}>{value}</option>;
        })}
      </Select>
    </DataCell>
  );
};

const ProductOptions = ({ options }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const selections = useSelector(
    (state) => state.productView.selections,
    shallowEqual
  );

  const updateOptionsValue = (option) => {
    const nextOption = {};
    Object.keys(option).forEach((property) => {
      const value = option[property];
      nextOption[property] =
        typeof value === "object" && value.length ? value[0] : value;
    });
    dispatch(setProductViewSelectedOptions(nextOption));
  };

  useEffect(() => {
    if (!selectedOption) {
      const _option = options[0];
      updateOptionsValue({
        ..._option,
        quantity: _option.quantity > 1 ? 1 : _option.quantity,
      });
      // dispatch(setProductViewSelectedOptions(_option));
      setSelectedOption(_option);
    }
  }, [selectedOption, setSelectedOption, options]);

  console.log(options);
  if (!selectedOption) {
    return <div>Please wait</div>;
  }
  return (
    <div>
      <pre>{JSON.stringify(selectedOption, null, 4)}</pre>
      <ColorSelector
        options={options}
        updateOptionsValue={updateOptionsValue}
        setSelectedOption={setSelectedOption}
      />
      {selectedOption.hasOwnProperty("power") && (
        <GenericOptionSelector
          label="Power"
          updatable="power"
          options={selectedOption.power}
          updateOptionsValue={updateOptionsValue}
        />
      )}
      {selectedOption.hasOwnProperty("storage") && (
        <GenericOptionSelector
          label="Storage"
          options={selectedOption.storage}
          updateOptionsValue={updateOptionsValue}
        />
      )}
      {selectedOption.quantity && (
        <QuantitySelector
          quantity={selectedOption.quantity}
          updateOptionsValue={updateOptionsValue}
        />
      )}
    </div>
  );
};

export default ProductOptions;
