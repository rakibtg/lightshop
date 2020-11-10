import { useSelector, shallowEqual } from "react-redux";
import { Text, Button, ShoppingCartIcon, Badge } from "evergreen-ui";
import Link from "../Link";

const CartButton = () => {
  const cartItemsCount = useSelector((state) => state.cart.count, shallowEqual);

  return (
    <Link to="/checkout" textDecoration="none">
      <Button marginRight={16} iconBefore={ShoppingCartIcon} color="teal">
        <Text>Cart</Text>{" "}
        {cartItemsCount > 0 && (
          <Badge margin={8} color="teal">
            {cartItemsCount} item{cartItemsCount > 1 && "s"}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default CartButton;
