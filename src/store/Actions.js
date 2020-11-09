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

const getProductById = (id) => {
  const { cart } = store.getState();
  const products = DataService();
  const product = products.find((p) => p.id === Number(id));
  return product;
};

export const setProductViewData = (id) => {
  const product = getProductById(id);
  return {
    type: "SET_PRODUCT_VIEW_DATA",
    payload: {
      product,
    },
  };
};

export const updateProductViewData = (id) => {
  const product = getProductById(id);
  return {
    type: "UPDATE_PRODUCT_VIEW_DATA",
    payload: {
      product,
    },
  };
};

export const resetProductViewData = () => ({
  type: "RESET_PRODUCT_VIEW_DATA",
});

export const updateProductViewSelection = (option) => {
  const selections = {};
  Object.keys(option).forEach((property) => {
    const value = option[property];
    selections[property] =
      typeof value === "object" && value.length ? value[0] : value;
  });
  return {
    type: "SET_PRODUCT_VIEW_DATA",
    payload: {
      selections,
    },
  };
};

export const setSelectedOption = (option) => ({
  type: "SET_SELECTED_OPTION",
  payload: { option },
});

export const addToCart = (id, price, selectedOptions) => {
  return {
    type: "ADD_TO_CART",
    payload: { id, price, selectedOptions },
  };
};

export const getCartItems = () => {
  const products = DataService();
  return {
    type: "GET_CART_ITEMS",
    payload: { products },
  };
};

export const removeProductOptionFromCart = (cartItemIndex) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_PRODUCT_OPTION_CART",
      payload: { cartItemIndex },
    });
    dispatch(calculateCart());
  };
};

export const removeProductFromCart = (id) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_PRODUCT_FROM_CART",
      payload: { id },
    });
    dispatch(calculateCart());
  };
};

export const calculateCart = () => ({
  type: "CALCULATE_CART",
});
