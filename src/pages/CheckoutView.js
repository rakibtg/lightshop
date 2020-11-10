import CartItems from "../components/cart/CartItems";
import { Pane, Text } from "evergreen-ui";
import { useEffect } from "react";
import { updateTitle } from "../store/actions/App";
import { useDispatch } from "react-redux";

const CheckoutView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTitle("Checkout"));
  }, [dispatch]);

  return (
    <Pane paddingTop={10}>
      <Pane paddingTop={10} paddingBottom={10}>
        <Text fontWeight="bold" fontSize={18}>
          Checkout Page
        </Text>
      </Pane>

      <CartItems />
    </Pane>
  );
};

export default CheckoutView;
