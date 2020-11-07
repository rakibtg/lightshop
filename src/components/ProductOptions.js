import { Pane, Text } from "evergreen-ui";
import { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { setActiveProductRequirements } from "../store/Actions";

import ColorSelector from "./ColorSelector";
import GenericOptionSelector from "./GenericOptionSelector";
import QuantitySelector from "./QuantitySelector";

const ProductOptions = ({ options }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const selections = useSelector(
    (state) => state.productView.selections,
    shallowEqual
  );

  useEffect(() => {
    if (!selectedOption) {
      const inStock = options.find((op) => op.quantity > 0);
      const _option = inStock ? inStock : options[0];
      dispatch(
        setActiveProductRequirements({
          ..._option,
          quantity: _option.quantity > 1 ? 1 : _option.quantity,
        })
      );
      setSelectedOption(_option);
    }
  }, [selectedOption, setSelectedOption, options, dispatch]);

  if (!selectedOption) {
    return (
      <Pane>
        <Text>Please wait</Text>
      </Pane>
    );
  }
  return (
    <div>
      <pre>{JSON.stringify({ selectedOption, selections }, null, 4)}</pre>
      <ColorSelector
        options={options}
        setSelectedOption={setSelectedOption}
        value={selections.color}
      />
      {selectedOption.hasOwnProperty("power") && (
        <GenericOptionSelector
          label="Power"
          updatable="power"
          options={selectedOption.power}
          value={selections.power}
        />
      )}
      {selectedOption.hasOwnProperty("storage") && (
        <GenericOptionSelector
          label="Storage"
          options={selectedOption.storage}
          value={selections.storage}
        />
      )}
      {selectedOption.hasOwnProperty("quantity") && (
        <QuantitySelector
          quantity={selectedOption.quantity}
          value={selections.quantity}
        />
      )}
    </div>
  );
};

export default ProductOptions;
