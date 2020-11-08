import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

import Schema from "./Schema";
import {
  titleReducer,
  productReducer,
  cartReducer,
  productViewReducer,
} from "./Reducers";

const reducers = combineReducers({
  title: titleReducer,
  products: productReducer,
  cart: cartReducer,
  productView: productViewReducer,
});

const middlewares = [ReduxThunk];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}
export default createStore(
  (state, action) => reducers(state, action),
  Schema,
  applyMiddleware(...middlewares)
);
