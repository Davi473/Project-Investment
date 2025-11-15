import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoginPage } from "../src/features/auth/pages/LoginPage";
import { BrowserRouter } from "react-router-dom";

function renderWithRouter(ui: any) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("LoginFrom", () => {
  it("Deve criar uma conta", async () => {
    renderWithRouter(<LoginPage />);

    // expect(screen.getByTestId("login").textContent).toBe("Login");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Login");
  });
});
