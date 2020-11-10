import Schema from "../../../store/Schema";
import { cartReducer } from "../../../store/reducers/Cart";
import {
  addToCart,
  removeProductOptionFromCart,
} from "../../../store/actions/Cart";

describe("Cart reducer", () => {
  it("Returns initial data for the cart", () => {
    expect(cartReducer(Schema.cart, { type: null })).toEqual(Schema.cart);
  });

  it("Add a product in cart", () => {
    const initialState = {
      items: [
        {
          productId: 1,
          price: 10,
          total: 10,
          color: "white",
          power: 6.5,
          quantity: 1,
        },
      ],
      count: 1,
      subTotal: 10,
    };
    const selectedOptions = { color: "white", power: 6.5, quantity: 1 };
    const action = addToCart(1, 10, selectedOptions);
    expect(cartReducer(Schema.cart, action)).toEqual(initialState);
  });

  it("Merge quantity of product with same option", () => {
    const selectedOptions = {
      color: "white",
      power: 6.5,
      quantity: 2,
    };
    const state = {
      items: [
        {
          productId: 1,
          price: 10,
          total: 20,
          color: "white",
          power: 6.5,
          quantity: 2,
        },
      ],
      count: 2,
      subTotal: 20,
    };
    const action = addToCart(1, 10, selectedOptions);
    expect(cartReducer(Schema.cart, action)).toEqual(state);
  });

  it("Remove prodcut option from cart", () => {
    const state = {
      items: [
        {
          productId: 1,
          price: 500,
          total: 1500,
          color: "white",
          power: 6.5,
          quantity: 3,
        },
      ],
      count: 3,
      subTotal: 1500,
    };
    const action = removeProductOptionFromCart(0);
    expect(cartReducer(state, action)).toEqual(state);
  });
});
