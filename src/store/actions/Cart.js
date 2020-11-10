import ActionTypes from "./ActionTypes";

export const addToCart = (id, price, selectedOptions) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: { id, price, selectedOptions },
  };
};

export const updateCartQuantity = (id, color, quantity) => (dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_CART_QUANTITY,
    payload: { id, color, quantity },
  });
  dispatch(calculateCart());
};

export const removeProductOptionFromCart = (cartItemIndex) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_PRODUCT_OPTION_CART,
      payload: { cartItemIndex },
    });
    dispatch(calculateCart());
  };
};

export const removeProductFromCart = (id) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_PRODUCT_FROM_CART,
      payload: { id },
    });
    dispatch(calculateCart());
  };
};

export const calculateCart = () => ({
  type: ActionTypes.CALCULATE_CART,
});
