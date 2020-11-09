import { Pane, Text } from "evergreen-ui";
import { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import {
  setSelectedOption,
  setActiveProductRequirements,
} from "../store/Actions";

import ColorSelector from "./ColorSelector";
import GenericOptionSelector from "./GenericOptionSelector";
import QuantitySelector from "./QuantitySelector";

const ProductOptions = ({ options }) => {
  const dispatch = useDispatch();
  const { selections, selectedOption } = useSelector(
    (state) => state.productView,
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
      dispatch(setSelectedOption(_option));
    }
  }, [selectedOption, options, dispatch]);

  if (!selectedOption) {
    return (
      <Pane>
        <Text>Please wait</Text>
      </Pane>
    );
  }
  return (
    <Pane>
      <ColorSelector options={options} value={selections.color} />

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
          updatable="storage"
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
    </Pane>
  );
};

export default ProductOptions;
