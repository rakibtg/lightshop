import { useEffect } from "react";
import { Pane, Text, IconButton, CrossIcon } from "evergreen-ui";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  getCartItems,
  getProducts,
  removeProductFromCart,
  removeProductOptionFromCart,
} from "../store/Actions";
import Link from "../components/Link";
import DataCell from "../components/DataCell";
import QuantitySelector from "../components/QuantitySelector";
import groupProducts from "../helpers/groupProducts";

const CartItems = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products, shallowEqual);
  const cart = useSelector((state) => state.cart, shallowEqual);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const removeProductOption = (cartItemIndex) => {
    dispatch(removeProductOptionFromCart(cartItemIndex));
  };

  const removeProduct = (id) => {
    dispatch(removeProductFromCart(id));
  };

  return (
    <Pane>
      {cart.items.length && products.length ? (
        groupProducts(cart.items, products).map((product, index) => {
          return (
            <Pane
              elevation={0}
              marginBottom={10}
              hoverElevation={1}
              background="tint1"
              key={index}
            >
              <Pane
                padding={15}
                borderBottom="default"
                display="flex"
                alignItems="center"
              >
                <Pane flexGrow={1}>
                  <Link
                    to={`/view/${product.id}`}
                    fontSize={16}
                    textDecoration="none"
                    fontWeight="bold"
                  >
                    {product.name}
                  </Link>{" "}
                  <Text>by {product.brand}</Text>
                </Pane>
                <Pane>
                  <IconButton
                    icon={CrossIcon}
                    height={40}
                    onClick={() => removeProduct(product.id)}
                  />
                </Pane>
              </Pane>
              <Pane>
                {product.cart.map((cartItem, cartIndex) => {
                  return (
                    <Pane
                      padding={15}
                      borderBottom="muted"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      key={cartIndex}
                    >
                      {cartItem.hasOwnProperty("color") && (
                        <DataCell label="Color">
                          <Pane display="flex" alignItems="center">
                            <Pane
                              width={10}
                              height={10}
                              borderRadius={10}
                              backgroundColor={cartItem.color}
                              border="default"
                              marginRight={6}
                            />
                            <Text>{cartItem.color}</Text>
                          </Pane>
                        </DataCell>
                      )}
                      {cartItem.hasOwnProperty("power") && (
                        <DataCell label="Power">{cartItem.power}</DataCell>
                      )}
                      {cartItem.hasOwnProperty("storage") && (
                        <DataCell label="Storage">{cartItem.storage}</DataCell>
                      )}
                      {cartItem.hasOwnProperty("price") && (
                        <DataCell label="price">${cartItem.price}</DataCell>
                      )}
                      {cartItem.hasOwnProperty("quantity") && (
                        <DataCell label="quantity">
                          {cartItem.quantity}
                          <QuantitySelector
                            quantity={cartItem.quantity}
                            value={cartItem.quantity}
                            id={product.id}
                            color={cartItem.color}
                          />
                        </DataCell>
                      )}
                      {cartItem.hasOwnProperty("total") && (
                        <DataCell label="total">${cartItem.total}</DataCell>
                      )}
                      <IconButton
                        icon={CrossIcon}
                        height={40}
                        onClick={() =>
                          removeProductOption(cartItem.cartItemIndex)
                        }
                      />
                    </Pane>
                  );
                })}
              </Pane>
              {/* <pre>{JSON.stringify(product, null, 4)}</pre> */}
            </Pane>
          );
        })
      ) : (
        <Text>Please add some item, your cart is empty!</Text>
      )}
      <Pane>
        <Text>Total: {cart.subTotal}</Text>
      </Pane>
    </Pane>
  );
};

export default CartItems;
