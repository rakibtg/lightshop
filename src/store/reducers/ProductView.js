import ActionTypes from "../actions/ActionTypes";
import { ProductViewSelections } from "../Schema";

export const productViewReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCT_VIEW_DATA:
      const { product = null, selections = {} } = action.payload;
      return {
        product: state.product || product,
        selections: {
          ...state.selections,
          ...selections,
        },
        selectedOption: state.selectedOption || null,
      };
    case ActionTypes.UPDATE_PRODUCT_VIEW_DATA:
      const { product: productUpdatable } = action.payload;
      return {
        ...state,
        product: productUpdatable,
        selectedOption: productUpdatable.options.find(
          (p) => p.color === state.selectedOption.color
        ),
      };
    case ActionTypes.RESET_PRODUCT_VIEW_DATA:
      return {
        product: null,
        selections: ProductViewSelections(),
        selectedOption: null,
      };
    case ActionTypes.SET_SELECTED_OPTION:
      const { option } = action.payload;
      return {
        ...state,
        selectedOption: option,
      };
    default:
      return state;
  }
};
