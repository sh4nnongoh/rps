import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./index";

afterEach(cleanup);

describe("Index.jsx", () => {
  it("renders", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Responsive drawer")).toBeInTheDocument();
  });
});
