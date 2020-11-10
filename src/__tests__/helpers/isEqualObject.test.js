import isEqualObject from "../../helpers/isEqualObject";

describe("Test isEqualObject helper function", () => {
  it("Should match same objects", () => {
    const initial = { id: 1, quantity: 5 };
    expect(isEqualObject(initial, initial)).toEqual(true);
  });
  it("Should return false for different objects", () => {
    const product_one = { id: 1, quantity: 5 };
    const product_two = { id: 5, quantity: 5 };
    expect(isEqualObject(product_one, product_two)).toEqual(false);
  });
});
