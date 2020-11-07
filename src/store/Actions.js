import store from "../store";
import DataService from "../services/DataService";

export const updateTitle = (payload) => ({
  type: "UPDATE_TITLE",
  payload,
});

export const getProducts = (payload) => ({
  type: "GET_PRODUCTS",
  payload,
});

export const setProductViewData = (id) => {
  let { products } = store.getState();
  const numericId = Number(id);
  if (!products.length) {
    products = DataService();
  }

  return {
    type: "SET_PRODUCT_VIEW_DATA",
    payload: {
      product: products.find((p) => p.id === numericId),
    },
  };
};

export const setProductViewSelectedOptions = (selections) => ({
  type: "SET_PRODUCT_VIEW_DATA",
  payload: {
    selections,
  },
});

export const resetProductViewData = () => ({
  type: "RESET_PRODUCT_VIEW_DATA",
});

export const setActiveProductRequirements = (option) => {
  return (dispatch) => {
    const nextOption = {};
    Object.keys(option).forEach((property) => {
      const value = option[property];
      nextOption[property] =
        typeof value === "object" && value.length ? value[0] : value;
    });
    dispatch(setProductViewSelectedOptions(nextOption));
  };
};
