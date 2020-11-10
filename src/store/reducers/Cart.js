import ActionTypes from "../actions/ActionTypes";

const findItemInCartIndex = (id, itemsToAdd, selectedOptions) => {
  return itemsToAdd.findIndex((cartItem) => {
    if (cartItem.productId === id) {
      const _selectedOption = Object.assign({}, selectedOptions);
      delete _selectedOption["quantity"];
      const shouldMerge = Object.keys(_selectedOption)
        .map((orderOptionKey) => {
          if (cartItem.hasOwnProperty(orderOptionKey)) {
            return cartItem[orderOptionKey] === _selectedOption[orderOptionKey];
          }
          return false;
        })
        .every((item) => item === true);
      return shouldMerge;
    }
    return false;
  });
};

export const cartReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.ADD_TO_CART:
      for (const optionKey in payload.selectedOptions) {
        if (typeof payload.selectedOptions[optionKey] === "undefined") {
          delete payload.selectedOptions[optionKey];
        }
      }

      let itemsToAdd = Object.assign([], state.items) || [];

      const itemExistsInCartIndex = findItemInCartIndex(
        payload.id,
        itemsToAdd,
        payload.selectedOptions
      );

      if (itemExistsInCartIndex >= 0) {
        // Item with same option found, merge quantity and total.
        const existingItem = itemsToAdd[itemExistsInCartIndex];
        const newQuantity =
          existingItem.quantity + payload.selectedOptions.quantity;
        itemsToAdd[itemExistsInCartIndex] = {
          ...itemsToAdd[itemExistsInCartIndex],
          quantity: newQuantity,
          total: payload.price * newQuantity,
        };
      } else {
        // Add item to cart.
        itemsToAdd.push({
          productId: payload.id,
          price: payload.price,
          total: payload.price * payload.selectedOptions.quantity,
          ...payload.selectedOptions,
        });
      }

      const subTotal = itemsToAdd.reduce((p, c) => p + c.total, 0);
      const count = itemsToAdd.reduce((p, c) => p + c.quantity, 0);

      return {
        items: itemsToAdd,
        count,
        subTotal,
      };
    case ActionTypes.REMOVE_PRODUCT_OPTION_CART:
      const { cartItemIndex } = payload;
      return {
        ...state,
        items: state.items.filter((_, index) => index !== cartItemIndex),
      };
    case ActionTypes.CALCULATE_CART:
      const calculatableItems = state.items.map((item) => ({
        ...item,
        total: item.price * item.quantity,
      }));
      return {
        ...state,
        items: calculatableItems,
        subTotal: calculatableItems.reduce((p, c) => p + c.total, 0),
        count: calculatableItems.reduce((p, c) => p + c.quantity, 0),
      };
    case ActionTypes.REMOVE_PRODUCT_FROM_CART:
      const cartItems = state.items.filter(
        (item) => item.productId !== payload.id
      );
      return {
        ...state,
        items: cartItems,
      };
    case ActionTypes.UPDATE_CART_QUANTITY:
      const items = state.items.map((item) => {
        if (item.productId === payload.id && item.color === payload.color) {
          return {
            ...item,
            quantity: payload.payload,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        items,
      };
    default:
      return state;
  }
};
