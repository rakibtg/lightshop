import Schema from "../../../store/Schema";
import { titleReducer } from "../../../store/reducers/App";

describe("App reducer", () => {
  it("Returns initial data for page title", () => {
    expect(titleReducer(Schema.title, { type: null })).toEqual(Schema.title);
  });
});
