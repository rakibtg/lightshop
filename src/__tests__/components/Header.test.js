import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Label from "../../components/Label";

describe("Label component", () => {
  it("Label component has logo text", async () => {
    const { getByText } = render(
      <Label>
        <div>Mock Label</div>
      </Label>
    );
    expect(getByText("Mock Label")).toBeInTheDocument();
  });
});
