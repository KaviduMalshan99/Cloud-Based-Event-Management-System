import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";

import Header from "./Header";

test("renders sidebar", () => {
  const { container } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});