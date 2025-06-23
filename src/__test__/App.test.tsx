import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

// Mocking the DevTool from react-hook-form
jest.mock("@hookform/devtools", () => ({
  DevTool: () => null,
}));

describe("App Form", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders all form inputs", () => {
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/signature/i)).toBeInTheDocument();
  });

  it("shows required validation errors when submitted empty", async () => {
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/signature is required/i)).toBeInTheDocument();
    });
  });

  it("validates invalid signature does not match first 3 chars + last name", async () => {
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Nadeem" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Asgar" },
    });
    fireEvent.change(screen.getByLabelText(/signature/i), {
      target: { value: "invalid signature" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/consent signature must match "nad Asgar"/i)
      ).toBeInTheDocument();
    });
  });

  it("submits form successfully with valid values", async () => {
    // Fill valid values
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Nadeem" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Asgar" },
    });
    fireEvent.change(screen.getByLabelText(/signature/i), {
      target: { value: "Nad Asgar" }, // first 3 letters of "Nadeem"
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/signature is required/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/must match/i)).not.toBeInTheDocument();
    });
  });
});
