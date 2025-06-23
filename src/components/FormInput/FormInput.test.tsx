import React from "react";
import { render, screen } from "@testing-library/react";
import FormInput from "./index";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

describe("FormInput Component", () => {
  const mockRegistration = {
    name: "testInput",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  } as UseFormRegisterReturn;

  it("renders input with label", () => {
    render(
      <FormInput
        label="Username"
        id="username"
        placeholder="Enter your username"
        registration={mockRegistration}
      />
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your username/i)
    ).toBeInTheDocument();
  });

  it("renders error message if error prop is passed", () => {
    const mockError: FieldError = {
      type: "required",
      message: "This field is required",
    };

    render(
      <FormInput
        label="Email"
        id="email"
        placeholder="Enter your email"
        registration={mockRegistration}
        error={mockError}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "This field is required"
    );
    expect(screen.getByLabelText(/email/i)).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });
});
