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
  const numericId = Number(id);
  const product = products.find((p) => p.id === numericId);
  const nextProduct = {
    ...product,
    options: product.options.map((option) => {
      const cartItems = cart.items.filter(
        (item) => item.productId === product.id && item.color === option.color
      );
      const syncedQuantity = cartItems.reduce((p, c) => p + c.quantity, 0);
      return {
        ...option,
        quantity: Math.max(0, option.quantity - syncedQuantity),
      };
    }),
  };
  return nextProduct;
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

export const setSelectedOption = (option) => ({
  type: "SET_SELECTED_OPTION",
  payload: { option },
});

export const addToCart = (id, price, order) => {
  return {
    type: "ADD_TO_CART",
    payload: { id, price, order },
  };
};
