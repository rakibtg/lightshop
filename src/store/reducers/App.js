import ActionTypes from "../actions/ActionTypes";
import BrowserService from "../../services/BrowserService";

export const titleReducer = (state = "", action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_TITLE:
      BrowserService(action.payload);
      return action.payload;
    default:
      return state;
  }
};
