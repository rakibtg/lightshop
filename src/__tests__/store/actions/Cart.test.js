import ReduxThunk from "redux-thunk";
import configureStore from "redux-mock-store";

import ActionTypes from "../../../store/actions/ActionTypes";
import {
  addToCart,
  updateCartQuantity,
  removeProductOptionFromCart,
  removeProductFromCart,
  calculateCart,
} from "../../../store/actions/Cart";

import Schema from "../../../store/Schema";
const mockStore = configureStore([ReduxThunk]);
const store = mockStore(Schema);

describe("Cart action creators", () => {
  beforeEach(() => store.clearActions());

  it("Should dispatch ADD_TO_CART to add an item to cart", () => {
    const expected = [
      {
        type: ActionTypes.ADD_TO_CART,
        payload: { id: 1, price: 2, selectedOptions: [] },
      },
    ];
    store.dispatch(addToCart(1, 2, []));
    expect(store.getActions()).toEqual(expected);
  });

  it("Should dispatch UPDATE_CART_QUANTITY and CALCULATE_CART to update quantity and re-calculate value", () => {
    const expected = [
      {
        type: ActionTypes.UPDATE_CART_QUANTITY,
        payload: { id: 2, color: "red", quantity: 3 },
      },
      { type: ActionTypes.CALCULATE_CART },
    ];
    store.dispatch(updateCartQuantity(2, "red", 3));
    expect(store.getActions()).toEqual(expected);
  });

  it("Should dispatch REMOVE_PRODUCT_OPTION_CART and CALCULATE_CART to remove item option and re-calculate value", () => {
    const expected = [
      {
        type: ActionTypes.REMOVE_PRODUCT_OPTION_CART,
        payload: { cartItemIndex: 0 },
      },
      { type: ActionTypes.CALCULATE_CART },
    ];
    store.dispatch(removeProductOptionFromCart(0));
    expect(store.getActions()).toEqual(expected);
  });

  it("Should dispatch REMOVE_PRODUCT_FROM_CART and CALCULATE_CART to remove item and re-calculate value", () => {
    const expected = [
      {
        type: ActionTypes.REMOVE_PRODUCT_FROM_CART,
        payload: { id: 1 },
      },
      { type: ActionTypes.CALCULATE_CART },
    ];
    store.dispatch(removeProductFromCart(1));
    expect(store.getActions()).toEqual(expected);
  });

  it("Should dispatch CALCULATE_CART to re-calculate cart value", () => {
    const expected = [{ type: ActionTypes.CALCULATE_CART }];
    store.dispatch(calculateCart());
    expect(store.getActions()).toEqual(expected);
  });
});
