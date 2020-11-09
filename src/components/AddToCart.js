import { Pane, Button, AddIcon, toaster } from "evergreen-ui";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { addToCart, updateProductViewData } from "../store/Actions";

const AddToCart = () => {
  const dispatch = useDispatch();
  const { product, selectedOption, selections } = useSelector(
    (state) => state.productView,
    shallowEqual
  );
  const { available } = product;
  const { quantity } = selectedOption || { quantity: 0 };

  const handleAddToCart = () => {
    const { id, price } = product;
    dispatch(addToCart(id, price, selections));
    dispatch(updateProductViewData(id));
    toaster.success("Item added to cart", {
      id: "added-cart",
    });
  };

  return (
    <Pane paddingTop={5}>
      <Button
        width={130}
        iconBefore={AddIcon}
        appearance="primary"
        intent="success"
        fontSize={14}
        disabled={!available || !quantity}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </Pane>
  );
};

export default AddToCart;
