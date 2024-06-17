import { render, screen, fireEvent } from "@testing-library/react";
import RemoveButton from "./RemoveButton";

describe("RemoveButton", () => {
  it("renders button with children", () => {
    render(<RemoveButton onClick={() => {}}>Remove</RemoveButton>);
    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  it("calls onClick when button is clicked", () => {
    const onClickMock = jest.fn();
    render(<RemoveButton onClick={onClickMock}>Remove</RemoveButton>);
    fireEvent.click(screen.getByText("Remove"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});