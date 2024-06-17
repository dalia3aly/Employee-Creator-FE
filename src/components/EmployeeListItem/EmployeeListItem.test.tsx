import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeListItem from "./EmployeeListItem";

const mockEmployee = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  contractType: "Contract",
  employmentType: "Part-time",
};

describe("EmployeeListItem", () => {
  it("renders employee details", () => {
    render(
      <EmployeeListItem
        employee={mockEmployee}
        onEdit={() => {}}
        onRemove={() => {}}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Contract - Part-time")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const onEditMock = jest.fn();
    render(
      <EmployeeListItem
        employee={mockEmployee}
        onEdit={onEditMock}
        onRemove={() => {}}
      />
    );

    fireEvent.click(screen.getByText("Edit"));
    expect(onEditMock).toHaveBeenCalledWith(1);
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemoveMock = jest.fn();
    render(
      <EmployeeListItem
        employee={mockEmployee}
        onEdit={() => {}}
        onRemove={onRemoveMock}
      />
    );

    fireEvent.click(screen.getByText("Remove"));
    expect(onRemoveMock).toHaveBeenCalledWith(1);
  });
});
