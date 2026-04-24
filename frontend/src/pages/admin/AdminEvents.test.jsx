import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import AdminEvents from "./AdminEvents";

test("renders admin events page", () => {
  const { container } = render(
    <BrowserRouter>
      <AdminEvents />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});