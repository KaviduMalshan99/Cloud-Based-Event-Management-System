import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Register from "./Register";

test("renders register page", () => {
  const { container } = render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});