import ActionTypes from "../actions/ActionTypes";
import DataService from "../../services/DataService";

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS:
      if (!state.length) return DataService();
    default:
      return state;
  }
};
