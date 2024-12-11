import React from "react";
import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

describe("Greeting Component", () => {
  it("should render initial text 'I am visible' when component loads", () => {
    render(<Greeting />);

    expect(
      screen.getByText("I am visible", { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.queryByText("after button clik I am visible", { exact: false })
    ).not.toBeInTheDocument();
  });

  it("should toggle visibility of text when button is clicked", () => {
    render(<Greeting />);

    const buttonEl = screen.getByRole("button", { name: /click me/i });

    expect(
      screen.getByText("I am visible", { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.queryByText("after button clik I am visible", { exact: false })
    ).not.toBeInTheDocument();

    buttonEl.click();

    expect(
      screen.getByText("after button clik I am visible", { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.queryByText("I am visible", { exact: false })
    ).not.toBeInTheDocument();

    buttonEl.click();

    expect(
      screen.getByText("I am visible", { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.queryByText("after button clik I am visible", { exact: false })
    ).not.toBeInTheDocument();
  });
});
