import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import Events from "./Events";

// ✅ MOCK APIs
vi.mock("../services/api", () => ({
  eventAPI: {
    get: vi.fn(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            title: "Test Event",
            description: "Test Desc",
            location: "Colombo",
            event_date: "2026-01-01",
            capacity: 100
          }
        ]
      })
    )
  },
  registrationAPI: {
    get: vi.fn(() =>
      Promise.resolve({
        data: []
      })
    ),
    post: vi.fn(() =>
      Promise.resolve({
        data: { message: "Registered!" }
      })
    )
  }
}));

test("renders events and loads data", async () => {
  render(
    <BrowserRouter>
      <Events />
    </BrowserRouter>
  );

  // wait until API data is rendered
  await waitFor(() => {
    expect(screen.getByText("Test Event")).toBeTruthy();
  });
});