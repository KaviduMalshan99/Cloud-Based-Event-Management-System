import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Sidebar from "./Sidebar";

test("renders sidebar", () => {
  const { container } = render(
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});