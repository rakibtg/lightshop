import configureStore from "redux-mock-store";

import ActionTypes from "../../../store/actions/ActionTypes";
import { updateTitle } from "../../../store/actions/App";

import Schema from "../../../store/Schema";
const mockStore = configureStore([]);
const store = mockStore(Schema);

describe("App action creators", () => {
  beforeEach(() => store.clearActions());

  it("Should dispatch UPDATE_TITLE to update the page title", () => {
    const expected = [
      {
        type: ActionTypes.UPDATE_TITLE,
        payload: "Test Title",
      },
    ];
    store.dispatch(updateTitle("Test Title"));
    expect(store.getActions()).toEqual(expected);
  });
});
