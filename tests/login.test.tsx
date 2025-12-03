import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RegisterPage } from "../src/features/auth/pages/RegisterPage";
import { BrowserRouter } from "react-router-dom";

function renderWithRouter(ui: any) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("LoginFrom", () => {
  it("Deve criar uma conta", async () => {
    renderWithRouter(<RegisterPage />);

    const emailInput = screen.getByPlaceholderText("Enter your E-mail");
    const nameInput = screen.getByPlaceholderText("Enter your Name");
    const passwordInput = screen.getByPlaceholderText("Enter your Password");

    fireEvent.change(emailInput, { target: { value: "fulano@gmail.com" } });
    fireEvent.change(nameInput, { target: { value: "Fulano Test" } });
    fireEvent.change(passwordInput, { target: { value: "@Fulnao1234" } });

    expect(emailInput).toHaveValue("fulano@gmail.com");
    expect(passwordInput).toHaveValue("@Fulnao1234");
  });
});
