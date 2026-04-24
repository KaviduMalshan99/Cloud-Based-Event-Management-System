import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Profile from "./Profile";

test("renders profile page", () => {
  const { container } = render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});