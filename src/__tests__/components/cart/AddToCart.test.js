import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore([ReduxThunk]);
const initialState = {
  title: "Product View",
  products: [
    {
      id: 1,
      name: "Philips hue bulb",
      brand: "Philips",
      price: 500,
      available: true,
      weight: 0.2,
      options: [
        { color: "white", power: [6.5, 9.5], quantity: 3 },
        { color: "red", power: [6.5, 9.5], quantity: 7 },
      ],
    },
    {
      id: 2,
      name: "Trådfria Lampor",
      brand: "IKEA",
      price: 300,
      available: true,
      weight: 0.2,
      options: [
        { color: "white", power: [6.5, 9.5], quantity: 3 },
        { color: "red", power: [6.5, 9.5], quantity: 7 },
        { color: "green", power: [6.5], quantity: 0 },
      ],
    },
  ],
  cart: { items: [], count: 0, subTotal: 0 },
  productView: {
    product: {
      id: 2,
      name: "Trådfria Lampor",
      brand: "IKEA",
      price: 300,
      available: true,
      weight: 0.2,
      options: [
        { color: "white", power: [6.5, 9.5], quantity: 3 },
        { color: "red", power: [6.5, 9.5], quantity: 7 },
        { color: "green", power: [6.5], quantity: 0 },
      ],
    },
    selections: { color: "white", power: 6.5, quantity: 1 },
    selectedOption: { color: "white", power: [6.5, 9.5], quantity: 3 },
  },
};

const store = mockStore(initialState);

import AddToCart from "../../../components/cart/AddToCart";

describe("AddToCart component", () => {
  it("Add an item to cart using AddToCart component", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddToCart />
      </Provider>
    );
    expect(getByText("Add to Cart")).toBeInTheDocument();
  });
});
