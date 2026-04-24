import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import AdminBookings from "./AdminBookings";

test("renders admin users page", () => {
  const { container } = render(
    <BrowserRouter>
      <AdminBookings />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});