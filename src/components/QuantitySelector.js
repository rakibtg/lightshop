import { Select } from "evergreen-ui";
import DataCell from "../components/DataCell";
import { updateProductViewSelection } from "../store/Actions";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

const QuantitySelector = ({ id, color, maxQuantity, value = "" }) => {
  const dispatch = useDispatch();
  console.log("quantity", maxQuantity);
  console.log("value", value);
  const cartItems = useSelector((state) => state.cart.items, shallowEqual);
  const selectedTotalQuantity = cartItems
    .filter((cartItem) => cartItem.productId === id && cartItem.color === color)
    .reduce((p, c) => p + c.quantity, 0);
  const availableQuantity = Math.max(0, maxQuantity - selectedTotalQuantity);
  const options = new Array(availableQuantity).fill(0);

  const handleQuantityChange = (event) => {
    dispatch(
      updateProductViewSelection({
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
