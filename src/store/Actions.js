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
