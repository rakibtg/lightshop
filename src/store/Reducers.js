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
    const { id, price, selectedOptions } = payload;
    for (const optionKey in selectedOptions) {
      if (typeof selectedOptions[optionKey] === "undefined") {
        delete selectedOptions[optionKey];
      }
    }

    let items = Object.assign([], state.items) || [];

    const itemExistsInCartIndex = items.findIndex((cartItem) => {
      if (cartItem.productId === id) {
        const _selectedOption = Object.assign({}, selectedOptions);
        delete _selectedOption["quantity"];
        const shouldMerge = Object.keys(_selectedOption)
          .map((orderOptionKey) => {
            if (cartItem.hasOwnProperty(orderOptionKey)) {
              return (
                cartItem[orderOptionKey] === _selectedOption[orderOptionKey]
              );
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
      const newQuantity = existingItem.quantity + selectedOptions.quantity;
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
        total: price * selectedOptions.quantity,
        ...selectedOptions,
      });
    }

    const subTotal = items.reduce((p, c) => p + c.total, 0);
    const count = items.reduce((p, c) => p + c.quantity, 0);

    return {
      items,
      count,
      subTotal,
    };
  } else if (type === "GET_CART_ITEMS") {
    const { products } = payload;
    const groupedItems = {};
    state.items.map((item) => {
      if (groupedItems.hasOwnProperty(item.productId)) {
        groupedItems[item.productId] = {
          ...groupedItems[item.productId],
          cart: [...groupedItems[item.productId]["cart"], item],
        };
      } else {
        const product = products.find((p) => p.id === item.productId);
        groupedItems[item.productId] = {
          ...product,
          cart: [item],
        };
      }
      return groupedItems;
    });
    return {
      ...state,
      groupedItems,
    };
  } else if (type === "REMOVE_PRODUCT_OPTION_CART") {
    const { cartItemIndex } = payload;
    return {
      ...state,
      items: state.items.filter((_, index) => index !== cartItemIndex),
    };
  } else if (type === "CALCULATE_CART") {
    return {
      ...state,
      subTotal: state.items.reduce((p, c) => p + c.total, 0),
      count: state.items.reduce((p, c) => p + c.quantity, 0),
    };
  } else if (type === "REMOVE_PRODUCT_FROM_CART") {
    const { id } = payload;
    const items = state.items.filter((item) => item.productId !== id);
    console.log("items", items);
    return {
      ...state,
      items,
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
