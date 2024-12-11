import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header"; // Adjust the import as per your file structure

describe("Header component", () => {
  test("renders the heading test", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Welcome to Expnese Tracker!/i)
    ).toBeInTheDocument();
  });
});
