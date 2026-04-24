import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import AdminUsers from "./AdminUsers";

test("renders admin users page", () => {
  const { container } = render(
    <BrowserRouter>
      <AdminUsers />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});