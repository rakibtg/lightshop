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

export const cartReducer = (state = null, action) => {
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
