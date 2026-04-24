import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import AdminDashboard from "./AdminDashboard";

test("renders admin users page", () => {
  const { container } = render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});