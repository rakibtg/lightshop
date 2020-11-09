import { ProductViewSelections } from "../store/Schema";
import DataService from "../services/DataService";
import BrowserService from "../services/BrowserService";

export const titleReducer = (state = "", action) => {
  if (action.type === "UPDATE_TITLE") {
    BrowserService(action.payload);
    return action.payload;
  }

  return state;
};

export const productReducer = (state = [], action) => {
  if (action.type === "GET_PRODUCTS") {
    if (!state.length) return DataService();
  }

  return state;
};

export const cartReducer = (state = {}, action) => {
  const { type, payload } = action;

  if (type === "ADD_TO_CART") {
    const { id, price, order } = payload;
    for (const orderKey in order) {
      if (typeof order[orderKey] === "undefined") {
        delete order[orderKey];
      }
    }

    let items = Object.assign([], state.items) || [];

    const itemExistsInCartIndex = items.findIndex((cartItem) => {
      if (cartItem.productId === id) {
        const _order = Object.assign({}, order);
        delete _order["quantity"];
        const shouldMerge = Object.keys(_order)
          .map((orderOptionKey) => {
            if (cartItem.hasOwnProperty(orderOptionKey)) {
              return cartItem[orderOptionKey] === _order[orderOptionKey];
            }
            return false;
          })
          .every((item) => item === true);
        return shouldMerge;
      }
      return false;
    });

    if (itemExistsInCartIndex >= 0) {
      // Item with same option found, merge quantity and total.
      const existingItem = items[itemExistsInCartIndex];
      const newQuantity = existingItem.quantity + order.quantity;
      items[itemExistsInCartIndex] = {
        ...items[itemExistsInCartIndex],
        quantity: newQuantity,
        total: price * newQuantity,
      };
    } else {
      // Add item to cart.
      items.push({
        productId: id,
        price,
        total: price * order.quantity,
        maxQuantity: order.quantity,
        ...order,
      });
    }

    const subTotal = items.reduce((p, c) => p + c.total, 0);
    const count = items.reduce((p, c) => p + c.quantity, 0);

    return {
      items,
      count,
      subTotal,
    };
  }
  return state;
};

export const productViewReducer = (state = {}, action) => {
  if (action.type === "SET_PRODUCT_VIEW_DATA") {
    const { product = null, selections = {} } = action.payload;
    return {
      product: state.product || product,
      selections: {
        ...state.selections,
        ...selections,
      },
      selectedOption: state.selectedOption || null,
    };
  } else if (action.type === "UPDATE_PRODUCT_VIEW_DATA") {
    const { product } = action.payload;
    return {
      ...state,
      product,
      selectedOption: product.options.find(
        (p) => p.color === state.selectedOption.color
      ),
    };
  } else if (action.type === "RESET_PRODUCT_VIEW_DATA") {
    return {
      product: null,
      selections: ProductViewSelections(),
      selectedOption: null,
    };
  } else if (action.type === "SET_SELECTED_OPTION") {
    const { option } = action.payload;
    return {
      ...state,
      selectedOption: option,
    };
  }

  return state;
};
