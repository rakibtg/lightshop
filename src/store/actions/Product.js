import ActionTypes from "./ActionTypes";

export const getProducts = (payload) => ({
  type: ActionTypes.GET_PRODUCTS,
  payload,
});
