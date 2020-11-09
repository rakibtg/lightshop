import { Pane, Button, AddIcon, toaster } from "evergreen-ui";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { addToCart, updateProductViewData } from "../store/Actions";

const AddToCart = () => {
  const dispatch = useDispatch();
  const { product, selectedOption, selections } = useSelector(
    (state) => state.productView,
    shallowEqual
  );

  const { quantity = 0, color = null } = selectedOption || {};
  const cartItems = useSelector((state) => state.cart.items, shallowEqual);
  const selectedTotalQuantity = cartItems
    .filter(
      (cartItem) =>
        cartItem.productId === product.id && cartItem.color === color
    )
    .reduce((p, c) => p + c.quantity, 0);
  const availableQuantity = quantity - selectedTotalQuantity;

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
        disabled={!product.available || !availableQuantity}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </Pane>
  );
};

export default AddToCart;
