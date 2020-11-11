import { Pane, IconButton, PlusIcon, MinusIcon, Text } from "evergreen-ui";
import DataCell from "../DataCell";
import { updateProductViewSelection } from "../../store/actions/ProductView";
import { updateCartQuantity } from "../../store/actions/Cart";
import { useDispatch } from "react-redux";

const QuantitySelector = ({
  id,
  color,
  maxQuantity,
  value = "",
  inCart = false,
  option = {},
}) => {
  const dispatch = useDispatch();
  const handleQuantityChange = (quantity) => {
    if (inCart) {
      dispatch(updateCartQuantity(id, color, quantity, option));
    } else {
      dispatch(updateProductViewSelection({ quantity }));
    }
  };

  const increase = () => {
    handleQuantityChange(value + 1);
  };
  const decrease = () => {
    handleQuantityChange(value - 1);
  };

  return (
    <DataCell label={`Quantity(${value}/${maxQuantity})`}>
      <>
        <Pane
          display="flex"
          width={130}
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            icon={MinusIcon}
            disabled={value <= 1}
            onClick={decrease}
            width={45}
          />
          <Pane paddingLeft={10} paddingRight={10}>
            <Text>{value}</Text>
          </Pane>
          <IconButton
            icon={PlusIcon}
            disabled={value >= maxQuantity}
            onClick={increase}
            width={45}
          />
        </Pane>
      </>
    </DataCell>
  );
};

export default QuantitySelector;
