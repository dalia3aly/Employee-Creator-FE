import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("renders login form", () => {
  render(<LoginForm onSubmit={jest.fn()} />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("validates form inputs", async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  fireEvent.submit(screen.getByRole("button"));

  expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
});

test("submits form with correct data", async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });

  fireEvent.submit(screen.getByRole("button"));

  expect(handleSubmit).toHaveBeenCalledWith({
    username: "testuser",
    password: "password123",
  });
});