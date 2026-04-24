import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import Login from "./Login";

// ✅ Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// ✅ Mock API
vi.mock("../services/api", () => ({
  authAPI: {
    post: vi.fn(() =>
      Promise.resolve({
        data: {
          access_token: "fake-token",
          role: "admin"
        }
      })
    )
  }
}));

test("login success flow", async () => {

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  // 🔹 type email
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "admin@test.com" }
  });

  // 🔹 type password
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "123456" }
  });

  // 🔹 click login
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  // 🔹 wait for navigation
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalled();
  });

});