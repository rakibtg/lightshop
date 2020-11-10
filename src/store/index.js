import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

import Schema from "./Schema";
import { titleReducer } from "./reducers/App";

import { cartReducer } from "./reducers/Cart";
import { productReducer } from "./reducers/Product";
import { productViewReducer } from "./reducers/ProductView";

const reducers = combineReducers({
  title: titleReducer,
  products: productReducer,
  cart: cartReducer,
  productView: productViewReducer,
});

const middlewares = [ReduxThunk];

if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger");
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

export default createStore(
  (state, action) => reducers(state, action),
  Schema,
  applyMiddleware(...middlewares)
);
