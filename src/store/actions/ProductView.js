import ActionTypes from "./ActionTypes";
import DataService from "../../services/DataService";

const getProductById = (id) => {
  const products = DataService();
  const product = products.find((p) => p.id === Number(id));
  return product;
};

export const setProductViewData = (id) => {
  const product = getProductById(id);
  return {
    type: ActionTypes.SET_PRODUCT_VIEW_DATA,
    payload: {
      product,
    },
  };
};

export const updateProductViewData = (id) => {
  const product = getProductById(id);
  return {
    type: ActionTypes.UPDATE_PRODUCT_VIEW_DATA,
    payload: {
      product,
    },
  };
};

export const resetProductViewData = () => ({
  type: ActionTypes.RESET_PRODUCT_VIEW_DATA,
});

export const updateProductViewSelection = (option) => {
  const selections = {};
  Object.keys(option).forEach((property) => {
    const value = option[property];
    selections[property] =
      typeof value === "object" && value.length ? value[0] : value;
  });
  return {
    type: ActionTypes.SET_PRODUCT_VIEW_DATA,
    payload: {
      selections,
    },
  };
};

export const setSelectedOption = (option) => ({
  type: ActionTypes.SET_SELECTED_OPTION,
  payload: { option },
});
