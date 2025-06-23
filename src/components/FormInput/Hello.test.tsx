import React from "react";
import { render, screen } from "@testing-library/react";
import Hello from "./Hello"; // Adjust path based on file structure

describe("Hello Component", () => {
  it("renders Hello text", () => {
    render(<Hello />);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
});
