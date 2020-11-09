import CartListItem from "../components/CartListItem";
import { Pane, Text } from "evergreen-ui";
import { useEffect } from "react";
import { updateTitle } from "../store/Actions";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

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

      <CartListItem />
    </Pane>
  );
};

export default CheckoutView;
