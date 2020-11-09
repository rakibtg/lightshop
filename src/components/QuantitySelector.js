import { Select } from "evergreen-ui";
import DataCell from "../components/DataCell";
import { setActiveProductRequirements } from "../store/Actions";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

const QuantitySelector = ({ id, color, quantity, value = "" }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items, shallowEqual);
  const selectedTotalQuantity = cartItems
    .filter((cartItem) => cartItem.productId === id && cartItem.color === color)
    .reduce((p, c) => p + c.quantity, 0);
  const availableQuantity = quantity - selectedTotalQuantity;
  const options = new Array(availableQuantity).fill(0);

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
          disabled={availableQuantity <= 0}
        >
          {options.map((option, index) => {
            const optionValue = index + 1;
            return (
              <option key={optionValue} value={optionValue}>
                {optionValue}
              </option>
            );
          })}
          {availableQuantity <= 0 && <option>Out of stock</option>}
        </Select>
      </>
    </DataCell>
  );
};

export default QuantitySelector;
